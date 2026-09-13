import { ArrowLeftOutlined, CheckCircleOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Progress, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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

const { Text, Title } = Typography;

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
  onBack: () => void;
}

type View = "stages" | "quiz" | "stage-done";

export default function ExerciseQuiz({ category, syncCode, onBack }: Props) {
  const { t } = useTranslation();
  const { questions, key: categoryKey, accent, color, title } = category;
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
        <span style={{ color: "#3a9a5c", fontWeight: 700 }}>
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
        <Text style={{ color: "#8a97a3" }}>{t("exerciseQuiz.noCorrectYet")}</Text>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {modalItems.map((item, i) => (
            <div key={item.id} style={{
              borderRadius: 12,
              border: "1px solid #3a9a5c33",
              background: "#f0faf4",
              padding: "14px 16px",
            }}>
              <Text style={{ fontWeight: 600, color: "#2d3840", display: "block", marginBottom: 6 }}>
                {i + 1}. {item.question}
              </Text>
              <Text style={{ color: "#1e6e3a", fontWeight: 500, display: "block", marginBottom: 6 }}>
                ✓ {item.options[item.correctIndex]}
              </Text>
              <Text style={{ color: "#4a5568", fontSize: 13, lineHeight: 1.6 }}>
                {item.explanation}
              </Text>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );

  // ── Stage-done view ──────────────────────────────────────────────────────

  if (view === "stage-done") {
    const pct = Math.round((stageScore / total) * 100);
    const tier = pct >= 80 ? "great" : pct >= 50 ? "good" : "retry";
    const scoreColor = tier === "great" ? "#3a9a5c" : tier === "good" ? "#e07b39" : "#d94a4a";
    const hasNext = activeStage + 1 < totalStages;

    return (
      <div style={{ padding: "48px 16px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        {correctModal}
        <Text style={{ fontSize: 13, color: "#8a97a3", letterSpacing: 0.4, textTransform: "uppercase" }}>
          {t("exerciseQuiz.stageOf", { current: activeStage + 1, total: totalStages })}
        </Text>
        <Title level={3} style={{ color: "#2d3840", margin: "4px 0 24px" }}>
          {t("exerciseQuiz.complete")}
        </Title>
        <div style={{ fontSize: 56, fontWeight: 700, color: scoreColor, lineHeight: 1 }}>
          {stageScore}
          <span style={{ fontSize: 24, color: "#8a97a3", fontWeight: 500 }}>/{total}</span>
        </div>
        <Progress percent={pct} strokeColor={scoreColor} showInfo={false}
          style={{ display: "block", maxWidth: 260, margin: "16px auto 24px" }} />
        <Text style={{ fontSize: 15, color: "#6b7580", display: "block" }}>
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
              style={{ borderRadius: 10, background: accent, borderColor: accent }}>
              {t("exerciseQuiz.nextStage")}
            </Button>
          )}
          <Button
            icon={<CheckCircleOutlined />}
            size="large"
            onClick={() => setShowModal(true)}
            disabled={stageCorrect.length === 0}
            style={{ borderRadius: 10, borderColor: accent, color: stageCorrect.length > 0 ? accent : undefined }}
          >
            {t("exerciseQuiz.correctAnswersBtn", { count: stageCorrect.length })}
          </Button>
          <Button size="large" onClick={() => setView("stages")} style={{ borderRadius: 10 }}>
            {t("exerciseQuiz.allStages")}
          </Button>
          <Button
            icon={<RedoOutlined />}
            size="large"
            onClick={() => confirmRedoStage(activeStage)}
            style={{ borderRadius: 10 }}
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
      <div style={{ padding: "16px 16px 40px", maxWidth: 680, margin: "0 auto" }}>
        {correctModal}

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 12 }}>
          <Button icon={<ArrowLeftOutlined />} type="text"
            onClick={() => setView("stages")} style={{ color: "#8a97a3" }} />
          <div style={{ flex: 1 }}>
            <Text style={{ color: "#8a97a3", fontSize: 13 }}>
              {t("exerciseQuiz.headerStatus", { title, stage: activeStage + 1, mastered: masteredCount, total })}
            </Text>
            <Progress percent={Math.round((masteredCount / total) * 100)}
              strokeColor={accent} showInfo={false} size="small" style={{ marginTop: 4 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Text style={{ color: accent, fontWeight: 600, fontSize: 14 }}>{t("exerciseQuiz.pts", { score: stageScore })}</Text>
            <Button
              icon={<CheckCircleOutlined />}
              size="small"
              onClick={() => setShowModal(true)}
              disabled={stageCorrect.length === 0}
              style={{ borderColor: accent, color: stageCorrect.length > 0 ? accent : undefined, fontSize: 12 }}
            >
              {stageCorrect.length}
            </Button>
          </div>
        </div>

        {/* Question */}
        {isRetry && (
          <Text style={{ color: "#e07b39", fontSize: 12.5, fontWeight: 600, display: "block", marginBottom: 6 }}>
            {t("exerciseQuiz.retryNotice")}
          </Text>
        )}
        <Card style={{ borderRadius: 16, background: color, border: `1px solid ${accent}33`, marginBottom: 16 }}
          styles={{ body: { padding: "24px 20px" } }}>
          <Text style={{ fontSize: 17, color: "#2d3840", lineHeight: 1.6, fontWeight: 500 }}>
            {q.question}
          </Text>
        </Card>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {q.options.map((opt, i) => {
            let bg = "#ffffff";
            let border = "1.5px solid #e0e8f0";
            let optColor = "#2d3840";
            if (answered) {
              if (i === q.correctIndex) { bg = "#e8f8ee"; border = "1.5px solid #3a9a5c"; optColor = "#1e6e3a"; }
              else if (i === selected && i !== q.correctIndex) { bg = "#fdecea"; border = "1.5px solid #d94a4a"; optColor = "#a02020"; }
            }
            return (
              <button key={i} onClick={() => choose(i)} disabled={answered}
                style={{ background: bg, border, borderRadius: 12, padding: "14px 18px",
                  textAlign: "left", cursor: answered ? "default" : "pointer", fontSize: 15,
                  color: optColor, fontFamily: "inherit", transition: "all 0.15s", width: "100%",
                  fontWeight: i === q.correctIndex && answered ? 600 : 400 }}>
                <span style={{ marginRight: 10, opacity: 0.5, fontWeight: 600 }}>
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <Card style={{ borderRadius: 12, background: isCorrect ? "#f0faf4" : "#fff8f0",
            border: `1px solid ${isCorrect ? "#3a9a5c44" : "#e07b3944"}`, marginBottom: 20 }}
            styles={{ body: { padding: "14px 16px" } }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{isCorrect ? "✓" : "✗"}</span>
              <div>
                <Text style={{ fontWeight: 600, color: isCorrect ? "#1e6e3a" : "#b34a00",
                  display: "block", marginBottom: 4 }}>
                  {isCorrect
                    ? t("exerciseQuiz.correctExclaim")
                    : t("exerciseQuiz.correctAnswerRetry", { answer: q.options[q.correctIndex] })}
                </Text>
                <Text style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.6 }}>
                  {q.explanation}
                </Text>
              </div>
            </div>
          </Card>
        )}

        {answered && (
          <Button type="primary" size="large" onClick={next}
            style={{ width: "100%", borderRadius: 12, height: 48,
              background: accent, borderColor: accent, fontWeight: 600 }}>
            {isCorrect && queue.length === 1 ? t("exerciseQuiz.finishStage") : t("exerciseQuiz.nextQuestion")}
          </Button>
        )}
      </div>
    );
  }

  // ── Stages selection view ────────────────────────────────────────────────

  const completedStageCount = Object.values(progress.stages).filter((r) => r.completed).length;
  const overallPct = questions.length
    ? Math.round((allCorrect.length / questions.length) * 100)
    : 0;

  return (
    <div style={{ padding: "16px 16px 40px", maxWidth: 680, margin: "0 auto" }}>
      {correctModal}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 12 }}>
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={onBack}
          style={{ color: "#8a97a3" }} />
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0, color: "#2d3840" }}>{title}</Title>
          <Text style={{ color: "#8a97a3", fontSize: 13 }}>
            {t("exerciseQuiz.stagesQuestionsCount", { stages: totalStages, questions: questions.length })}
          </Text>
        </div>
        <Button
          icon={<CheckCircleOutlined />}
          onClick={() => setShowModal(true)}
          disabled={allCorrect.length === 0}
          style={{ borderColor: accent, color: allCorrect.length > 0 ? accent : undefined }}
        >
          {t("exerciseQuiz.correctCountBtn", { count: allCorrect.length })}
        </Button>
      </div>

      {/* Overall progress summary */}
      <div style={{
        background: color, border: `1px solid ${accent}33`, borderRadius: 14,
        padding: "14px 18px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontWeight: 700, fontSize: 14, color: "#2d3840" }}>{t("exerciseQuiz.yourProgress")}</Text>
          <Text style={{ fontWeight: 700, fontSize: 16, color: accent }}>{overallPct}%</Text>
        </div>
        <Progress percent={overallPct} strokeColor={accent} showInfo={false} size="small" />
        <Text style={{ color: "#6b7580", fontSize: 12.5, marginTop: 6, display: "block" }}>
          {t("exerciseQuiz.progressSummary", {
            correct: allCorrect.length,
            total: questions.length,
            done: completedStageCount,
            stages: totalStages,
          })}
        </Text>
      </div>

      {/* Stage grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {Array.from({ length: totalStages }, (_, idx) => {
          const rec = normalizeRecord(progress.stages[idx]);
          const isCompleted = rec.completed;
          const isInProgress = !isCompleted && (rec.masteredIds.length > 0 || rec.wrongOnceIds.length > 0);
          const locked = isStageLocked(idx);
          const stScore = rec.correctIds.length;
          const stMastered = rec.masteredIds.length;

          let cardBg = "#f8f9fa";
          let cardBorder = "1.5px dashed #d8e0e8";
          let badgeBg = "#e6ebf0";
          let badgeColor = "#8a97a3";
          let titleColor = "#6b7580";
          let statusText = t("exerciseQuiz.notStarted");
          let statusColor = "#8a97a3";
          let barPercent: number | null = null;
          let barColor = accent;

          if (locked) {
            statusText = t("exerciseQuiz.locked");
          } else if (isCompleted) {
            const pct = Math.round((stScore / STAGE_SIZE) * 100);
            statusText = t("exerciseQuiz.stageScoreLine", { score: stScore, size: STAGE_SIZE });
            if (pct >= 80) {
              cardBg = "#f0faf4"; cardBorder = "1.5px solid #3a9a5c55";
              badgeBg = "#3a9a5c"; badgeColor = "#fff";
              titleColor = "#1e6e3a"; statusColor = "#3a9a5c";
            } else if (pct >= 50) {
              cardBg = "#fff8f0"; cardBorder = "1.5px solid #e07b3955";
              badgeBg = "#e07b39"; badgeColor = "#fff";
              titleColor = "#b34a00"; statusColor = "#e07b39";
            } else {
              cardBg = "#fdf1f0"; cardBorder = "1.5px solid #d94a4a55";
              badgeBg = "#d94a4a"; badgeColor = "#fff";
              titleColor = "#a02020"; statusColor = "#d94a4a";
            }
          } else if (isInProgress) {
            cardBg = color;
            cardBorder = `1.5px solid ${accent}55`;
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
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 14,
                padding: "14px 16px",
                textAlign: "left",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.6 : 1,
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
                {idx + 1}
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: titleColor, marginBottom: 1 }}>
                  {t("exerciseQuiz.stageLabel", { n: idx + 1 })}
                </div>
                <div style={{ fontSize: 12, color: "#8a97a3", marginBottom: 4 }}>
                  {t("exerciseQuiz.questionRange", { start: startQ, end: endQ })}
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: statusColor }}>
                  {statusText}
                </div>
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
