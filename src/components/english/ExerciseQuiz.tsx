import { ArrowRightOutlined, CheckCircleOutlined, CheckOutlined, CloseOutlined, LockOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Modal, Progress, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "../../hooks/useHotkeys";
import PageHeader from "../PageHeader";
import { KeyHint } from "../ui/Session";
import type { ExerciseCategory, ExerciseQuestion } from "../../data/english/exercises";
import {
  loadExerciseProgress,
  pushRemoteExerciseProgress,
  saveExerciseProgress,
  subscribeRemoteExerciseProgress,
  type CategoryProgress,
  type ExerciseProgressState,
  type StageRecord,
} from "../../utils/english/exerciseProgress";

const { Text } = Typography;

const STAGE_SIZE = 20;

// Fills in defaults for any missing fields — keeps old saved progress
// (from before retries existed) from crashing on the new shape.
function normalizeRecord(raw?: Partial<StageRecord>): StageRecord {
  return {
    correctIds: raw?.correctIds ?? [],
    masteredIds: raw?.masteredIds ?? [],
    wrongOnceIds: raw?.wrongOnceIds ?? [],
    completed: raw?.completed ?? false,
  };
}

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  category: ExerciseCategory;
  syncCode: string;
  onBack?: () => void;
}

type View = "stages" | "quiz" | "stage-done";

export default function ExerciseQuiz({ category, syncCode }: Props) {
  const { t } = useTranslation();
  // "-" in the data marks the zero article (no article at all).
  const optionLabel = (opt: string) => (opt.trim() === "-" ? t("exerciseQuiz.noArticle") : opt);
  const { questions, key: categoryKey, accent, title } = category;
  const totalStages = Math.ceil(questions.length / STAGE_SIZE);

  // ── Persisted state (local-first, synced to Firestore via syncCode) ──
  const [allProgress, setAllProgress] = useState<ExerciseProgressState>(
    () => loadExerciseProgress(syncCode)
  );
  const progress: CategoryProgress = allProgress.categories[categoryKey] ?? { stages: {} };

  const remoteSyncedRef = useRef(false);

  useEffect(() => {
    saveExerciseProgress(syncCode, allProgress);
  }, [syncCode, allProgress]);

  useEffect(() => {
    remoteSyncedRef.current = false;
    const unsubscribe = subscribeRemoteExerciseProgress(syncCode, (remoteState) => {
      remoteSyncedRef.current = true;
      setAllProgress((current) => {
        const remoteTime = remoteState.updatedAt ?? 0;
        const localTime = current.updatedAt ?? 0;
        if (remoteTime < localTime) {
          pushRemoteExerciseProgress(syncCode, current);
          return current;
        }
        return remoteState;
      });
    });
    return unsubscribe;
  }, [syncCode]);

  // Update one category's progress (functional form to avoid stale closures)
  // and push it to Firestore right away once the remote subscription is live.
  const updateCategoryProgress = (updater: (p: CategoryProgress) => CategoryProgress) => {
    setAllProgress((prev) => {
      const nextCategory = updater(prev.categories[categoryKey] ?? { stages: {} });
      const next: ExerciseProgressState = {
        categories: { ...prev.categories, [categoryKey]: nextCategory },
        updatedAt: Date.now(),
      };
      saveExerciseProgress(syncCode, next);
      if (remoteSyncedRef.current) {
        pushRemoteExerciseProgress(syncCode, next);
      }
      return next;
    });
  };

  // ── View state ──
  const [view, setView] = useState<View>("stages");
  const [activeStage, setActiveStage] = useState(0);

  // ── Quiz state ──
  // The queue holds every question in the stage still needing a correct
  // answer, in play order. A wrong answer sends the question to the back of
  // the queue instead of dropping it, so it comes back around later; a
  // correct answer removes it for good. The stage finishes once the queue
  // is empty.
  const [queue, setQueue] = useState<ExerciseQuestion[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [stageCorrect, setStageCorrect] = useState<ExerciseQuestion[]>([]);

  // ── Modal ──
  const [showModal, setShowModal] = useState(false);

  // ── Derived ──
  const stageQs = questions.slice(activeStage * STAGE_SIZE, (activeStage + 1) * STAGE_SIZE);
  const total = stageQs.length;
  const q = queue[0];
  const masteredCount = total - queue.length;
  const answered = selected !== null;
  const isCorrect = answered && !!q && selected === q.correctIndex;
  const stageScore = stageCorrect.length;
  const activeRecord = normalizeRecord(progress.stages[activeStage]);
  const isRetry = !!q && activeRecord.wrongOnceIds.includes(q.id);

  // Update the active stage's saved record (functional form to avoid stale closure)
  const updateRecord = (updater: (r: StageRecord) => StageRecord) => {
    updateCategoryProgress((prev) => ({
      ...prev,
      stages: {
        ...prev.stages,
        [activeStage]: updater(normalizeRecord(prev.stages[activeStage])),
      },
    }));
  };

  // ── Quiz actions ──

  const choose = (idx: number) => {
    if (answered || !q) return;
    setSelected(idx);
    const isFirstTry = !activeRecord.wrongOnceIds.includes(q.id);
    if (idx === q.correctIndex) {
      if (isFirstTry) setStageCorrect((prev) => [...prev, q]);
      updateRecord((r) => ({
        ...r,
        correctIds: isFirstTry ? [...r.correctIds, q.id] : r.correctIds,
        masteredIds: r.masteredIds.includes(q.id) ? r.masteredIds : [...r.masteredIds, q.id],
      }));
    } else {
      updateRecord((r) => ({
        ...r,
        wrongOnceIds: r.wrongOnceIds.includes(q.id) ? r.wrongOnceIds : [...r.wrongOnceIds, q.id],
      }));
    }
  };

  const next = () => {
    if (!q) return;
    const rest = queue.slice(1);
    const nextQueue = isCorrect ? rest : [...rest, q];
    if (nextQueue.length === 0) {
      updateRecord((r) => ({ ...r, completed: true }));
      setView("stage-done");
    } else {
      setQueue(nextQueue);
      setSelected(null);
    }
  };

  // ── Stage navigation ──

  // A stage unlocks once the one before it is completed — stage 0 is
  // always open.
  const isStageLocked = (idx: number) =>
    idx > 0 && !normalizeRecord(progress.stages[idx - 1]).completed;

  // Entering an already-completed stage no longer wipes its saved answers —
  // it opens the stage's results summary instead, with an explicit "Redo
  // stage" action (see `redoStage`) for starting it over on purpose.
  const enterStage = (idx: number) => {
    if (isStageLocked(idx)) return;
    const rec = normalizeRecord(progress.stages[idx]);
    const qs = questions.slice(idx * STAGE_SIZE, (idx + 1) * STAGE_SIZE);

    if (rec.completed) {
      const correctSet = new Set(rec.correctIds);
      setStageCorrect(qs.filter((item) => correctSet.has(item.id)));
      setActiveStage(idx);
      setView("stage-done");
      return;
    }

    const masteredSet = new Set(rec.masteredIds);
    const correctSet = new Set(rec.correctIds);
    setQueue(qs.filter((item) => !masteredSet.has(item.id)));
    setStageCorrect(qs.filter((item) => correctSet.has(item.id)));
    setActiveStage(idx);
    setSelected(null);
    setView("quiz");
  };

  // Explicitly starts a stage over from scratch, clearing its saved answers.
  const redoStage = (idx: number) => {
    const qs = questions.slice(idx * STAGE_SIZE, (idx + 1) * STAGE_SIZE);
    updateCategoryProgress((p) => ({ ...p, stages: { ...p.stages, [idx]: normalizeRecord() } }));
    setQueue(qs);
    setStageCorrect([]);
    setActiveStage(idx);
    setSelected(null);
    setView("quiz");
  };

  const confirmRedoStage = (idx: number) => {
    Modal.confirm({
      title: t("exerciseQuiz.redoConfirmTitle", { n: idx + 1 }),
      content: t("exerciseQuiz.redoConfirmContent"),
      okText: t("common.redo"),
      okButtonProps: { danger: true },
      cancelText: t("common.cancel"),
      onOk: () => redoStage(idx),
    });
  };

  // ── All correct answers across all stages (for stages-view modal) ──
  const allCorrect = Object.entries(progress.stages).flatMap(([idxStr, rec]) => {
    const idx = Number(idxStr);
    const qs = questions.slice(idx * STAGE_SIZE, (idx + 1) * STAGE_SIZE);
    const ids = new Set(normalizeRecord(rec).correctIds);
    return qs.filter((item) => ids.has(item.id));
  });

  const modalItems = view === "stages" ? allCorrect : stageCorrect;

  // ── Shared modal ──
  const correctModal = (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={
        <Button type="primary" onClick={() => setShowModal(false)}
          style={{ background: accent, borderColor: accent }}>
          {t("common.close")}
        </Button>
      }
      title={
        <span style={{ color: "#1f7a46", fontWeight: 700 }}>
          {view === "stages"
            ? t("exerciseQuiz.correctAnswersTotal", { count: allCorrect.length })
            : t("exerciseQuiz.correctAnswersStage", {
                score: stageCorrect.length,
                total,
                stage: activeStage + 1,
              })}
        </span>
      }
      width={640}
      styles={{ body: { maxHeight: "60vh", overflowY: "auto", padding: "16px 0" } }}
    >
      {modalItems.length === 0 ? (
        <Text style={{ color: "#5f636b" }}>{t("exerciseQuiz.noCorrectYet")}</Text>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {modalItems.map((item, i) => (
            <div key={item.id} style={{
              borderRadius: 10,
              border: "1px solid #1f7a4633",
              background: "#e9f4ec",
              padding: "14px 16px",
            }}>
              <Text style={{ fontWeight: 600, color: "#1c1d1f", display: "block", marginBottom: 6 }}>
                {i + 1}. {item.question}
              </Text>
              <Text style={{ color: "#1f7a46", fontWeight: 500, display: "block", marginBottom: 6 }}>
                {optionLabel(item.options[item.correctIndex])}
              </Text>
              <Text style={{ color: "#1c1d1f", fontSize: 13, lineHeight: 1.6 }}>
                {item.explanation}
              </Text>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );

  // 1–4 answers, Enter moves on once the explanation is showing.
  useHotkeys(
    view === "quiz" && q
      ? {
          ...Object.fromEntries(q.options.map((_, i) => [String(i + 1), () => !answered && choose(i)])),
          Enter: () => answered && next(),
        }
      : {},
  )

  // ── Stage-done view ──────────────────────────────────────────────────────

  if (view === "stage-done") {
    const pct = Math.round((stageScore / total) * 100);
    const tier = pct >= 80 ? "great" : pct >= 50 ? "good" : "retry";
    const scoreColor = tier === "great" ? "#1f7a46" : tier === "good" ? "#946200" : "#b8352b";
    const hasNext = activeStage + 1 < totalStages;

    return (
      <div className="session result" style={{ paddingTop: 56 }}>
        {correctModal}
        <span className="eyebrow">
          {t("exerciseQuiz.stageOf", { current: activeStage + 1, total: totalStages })}
        </span>
        <h2 className="page-title" style={{ fontSize: 32 }}>{t("exerciseQuiz.complete")}</h2>
        <div className="result-score" style={{ color: scoreColor }}>
          {stageScore}
          <small>/{total}</small>
        </div>
        <Progress percent={pct} strokeColor={scoreColor} showInfo={false}
          style={{ display: "block", maxWidth: 260, margin: "16px auto 24px" }} />
        <Text style={{ fontSize: 15, color: "#3d4046", display: "block" }}>
          {tier === "great"
            ? t("exerciseQuiz.tierGreat")
            : tier === "good"
            ? t("exerciseQuiz.tierGood")
            : t("exerciseQuiz.tierRetry")}
        </Text>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          {hasNext && (
            <Button type="primary" size="large"
              onClick={() => enterStage(activeStage + 1)}
            >
              {t("exerciseQuiz.nextStage")}
            </Button>
          )}
          <Button
            icon={<CheckCircleOutlined />}
            size="large"
            onClick={() => setShowModal(true)}
            disabled={stageCorrect.length === 0}
          >
            {t("exerciseQuiz.correctAnswersBtn", { count: stageCorrect.length })}
          </Button>
          <Button size="large" onClick={() => setView("stages")}>
            {t("exerciseQuiz.allStages")}
          </Button>
          <Button
            icon={<RedoOutlined />}
            size="large"
            onClick={() => confirmRedoStage(activeStage)}
          >
            {t("exerciseQuiz.redoStage")}
          </Button>
        </div>
      </div>
    );
  }

  // ── Quiz view ────────────────────────────────────────────────────────────

  if (view === "quiz" && q) {
    return (
      <div className="session">
        {correctModal}

        <div className="session-bar">
          <Button
            type="text"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => setView("stages")}
            className="session-exit"
            aria-label={t("exerciseQuiz.allStages")}
          />
          <div className="session-progress">
            <span style={{ width: `${(masteredCount / total) * 100}%` }} />
          </div>
          <span className="session-count">
            {masteredCount}/{total}
          </span>
          <Button
            icon={<CheckCircleOutlined />}
            size="small"
            onClick={() => setShowModal(true)}
            disabled={stageCorrect.length === 0}
          >
            {stageCorrect.length}
          </Button>
        </div>
        <span className="eyebrow" style={{ textAlign: "center" }}>
          {t("exerciseQuiz.headerStatus", { title, stage: activeStage + 1, mastered: masteredCount, total })}
        </span>

        {/* Question */}
        {isRetry && (
          <Text style={{ color: "#2c4d86", fontSize: 12.5, fontWeight: 600, display: "block", textAlign: "center" }}>
            {t("exerciseQuiz.retryNotice")}
          </Text>
        )}
        <h2 className="exercise-question">{q.question}</h2>

        <div className="exercise-options">
          {q.options.map((opt, i) => {
            const state = !answered
              ? "idle"
              : i === q.correctIndex
                ? "correct"
                : i === selected
                  ? "wrong"
                  : "eliminated";
            return (
              <button key={i} type="button" className="option" data-state={state}
                onClick={() => choose(i)} disabled={answered}>
                <span className="option-key">{i + 1}</span>
                <span className="option-body">
                  <span className="option-main" style={{ fontWeight: 500 }}>{optionLabel(opt)}</span>
                </span>
                {state === "correct" && <CheckOutlined className="option-icon" />}
                {state === "wrong" && <CloseOutlined className="option-icon" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="explanation" data-tone={isCorrect ? "success" : "warning"}>
            <strong>
              {isCorrect
                ? t("exerciseQuiz.correctExclaim")
                : t("exerciseQuiz.correctAnswerRetry", { answer: optionLabel(q.options[q.correctIndex]) })}
            </strong>
            <p>{q.explanation}</p>
          </div>
        )}

        {answered && (
          <Button type="primary" size="large" block onClick={next}>
            {isCorrect && queue.length === 1 ? t("exerciseQuiz.finishStage") : t("exerciseQuiz.nextQuestion")}
          </Button>
        )}
        <KeyHint>
          <kbd>1</kbd>–<kbd>4</kbd> {t("hotkeys.answer")} · <kbd>Enter</kbd> {t("hotkeys.next")}
        </KeyHint>
      </div>
    );
  }

  // ── Stages selection view ────────────────────────────────────────────────

  const completedStageCount = Object.values(progress.stages).filter((r) => r.completed).length;
  const overallPct = questions.length
    ? Math.round((allCorrect.length / questions.length) * 100)
    : 0;

  return (
    <div className="page page-wide" style={{ maxWidth: 960 }}>
      {correctModal}

      <PageHeader
        eyebrow={t("exerciseQuiz.stagesQuestionsCount", { stages: totalStages, questions: questions.length })}
        title={title}
      />

      <section className="level-hero">
        <Progress
          type="circle"
          percent={overallPct}
          size={88}
          strokeWidth={8}
          strokeColor="#1c1d1f"
          railColor="#e4e2dc"
          format={(p) => <span style={{ fontSize: 18, fontWeight: 600, color: "#1c1d1f" }}>{p}%</span>}
        />
        <div className="level-hero-stats">
          <div className="stat-big">
            {allCorrect.length}
            <small> / {questions.length}</small>
          </div>
          <div className="stat-caption">
            {t("exerciseQuiz.progressSummary", {
              correct: allCorrect.length,
              total: questions.length,
              done: completedStageCount,
              stages: totalStages,
            })}
          </div>
        </div>
        <Button
          icon={<CheckCircleOutlined />}
          onClick={() => setShowModal(true)}
          disabled={allCorrect.length === 0}
          className="hero-side-btn"
        >
          {t("exerciseQuiz.correctCountBtn", { count: allCorrect.length })}
        </Button>
      </section>

      {/* Stage grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {Array.from({ length: totalStages }, (_, idx) => {
          const rec = normalizeRecord(progress.stages[idx]);
          const isCompleted = rec.completed;
          const isInProgress = !isCompleted && (rec.masteredIds.length > 0 || rec.wrongOnceIds.length > 0);
          const locked = isStageLocked(idx);
          const stScore = rec.correctIds.length;
          const stMastered = rec.masteredIds.length;

          let cardBg = "#ffffff";
          let cardBorder = "1px solid #e4e2dc";
          let badgeBg = "#1c1d1f";
          let badgeColor = "#fff";
          let titleColor = "#1c1d1f";
          let statusText = t("exerciseQuiz.notStarted");
          let statusColor = "#5f636b";
          let barPercent: number | null = null;
          let barColor = accent;

          if (locked) {
            statusText = t("exerciseQuiz.locked");
            cardBg = "transparent";
            badgeBg = "#efede7";
            badgeColor = "#8b8f96";
            titleColor = "#5f636b";
          } else if (isCompleted) {
            const pct = Math.round((stScore / STAGE_SIZE) * 100);
            statusText = t("exerciseQuiz.stageScoreLine", { score: stScore, size: STAGE_SIZE });
            if (pct >= 80) {
              cardBorder = "1px solid #1f7a4666";
              badgeBg = "#1f7a46"; badgeColor = "#fff";
              titleColor = "#1f7a46"; statusColor = "#1f7a46";
            } else if (pct >= 50) {
              cardBorder = "1px solid #94620066";
              badgeBg = "#946200"; badgeColor = "#fff";
              titleColor = "#946200"; statusColor = "#946200";
            } else {
              cardBorder = "1px solid #b8352b66";
              badgeBg = "#b8352b"; badgeColor = "#fff";
              titleColor = "#b8352b"; statusColor = "#b8352b";
            }
          } else if (isInProgress) {
            cardBorder = `1px solid ${accent}88`;
            badgeBg = accent; badgeColor = "#fff";
            titleColor = accent;
            statusText = t("exerciseQuiz.stageMasteredLine", { mastered: stMastered, size: STAGE_SIZE });
            statusColor = accent;
            barPercent = Math.round((stMastered / STAGE_SIZE) * 100);
            barColor = accent;
          }

          const startQ = idx * STAGE_SIZE + 1;
          const endQ = Math.min((idx + 1) * STAGE_SIZE, questions.length);

          return (
            <button
              key={idx}
              className="stage-card"
              onClick={() => enterStage(idx)}
              disabled={locked}
              title={locked ? statusText : undefined}
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 14,
                padding: "16px",
                textAlign: "left",
                cursor: locked ? "not-allowed" : "pointer",
                boxShadow: locked ? "none" : "var(--shadow-sm)",
                fontFamily: "inherit",
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                animationDelay: `${idx * 20}ms`,
              }}
            >
              <div style={{
                flexShrink: 0, width: 38, height: 38, borderRadius: 10,
                background: badgeBg, color: badgeColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 15,
              }}>
                {locked ? <LockOutlined style={{ fontSize: 14 }} /> : idx + 1}
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: titleColor, marginBottom: 1 }}>
                  {t("exerciseQuiz.stageLabel", { n: idx + 1 })}
                </div>
                <div style={{ fontSize: 12, color: "#5f636b", marginBottom: 4 }}>
                  {t("exerciseQuiz.questionRange", { start: startQ, end: endQ })}
                </div>
                {!locked && (
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: statusColor }}>
                    {statusText}
                  </div>
                )}
                {!locked && !isCompleted && !isInProgress && (
                  <ArrowRightOutlined style={{ position: "absolute", top: 18, right: 16, fontSize: 12, color: "#8b8f96" }} />
                )}
                {barPercent !== null && (
                  <Progress percent={barPercent} strokeColor={barColor} showInfo={false}
                    size="small" style={{ marginTop: 6, marginBottom: 0 }} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
