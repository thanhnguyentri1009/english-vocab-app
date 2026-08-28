import { ArrowLeftOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Progress, Typography } from "antd";
import { useEffect, useState } from "react";
import type { ExerciseCategory, ExerciseQuestion } from "../data/exercises";

const { Text, Title } = Typography;

const STAGE_SIZE = 20;
const STORAGE_KEY = "exercise-stage-progress";

// ── Progress types ──────────────────────────────────────────────────────────

interface StageRecord {
  questionIndex: number;
  score: number;
  correctIds: string[];
  completed: boolean;
}

interface CategoryProgress {
  stages: Record<number, StageRecord>;
}

function loadCategoryProgress(categoryKey: string): CategoryProgress {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return all[categoryKey] ?? { stages: {} };
  } catch {
    return { stages: {} };
  }
}

function persistCategoryProgress(categoryKey: string, data: CategoryProgress) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    all[categoryKey] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  category: ExerciseCategory;
  onBack: () => void;
}

type View = "stages" | "quiz" | "stage-done";

export default function ExerciseQuiz({ category, onBack }: Props) {
  const { questions, key: categoryKey, accent, color, title } = category;
  const totalStages = Math.ceil(questions.length / STAGE_SIZE);

  // ── Persisted state ──
  const [progress, setProgress] = useState<CategoryProgress>(
    () => loadCategoryProgress(categoryKey)
  );

  useEffect(() => {
    persistCategoryProgress(categoryKey, progress);
  }, [categoryKey, progress]);

  // ── View state ──
  const [view, setView] = useState<View>("stages");
  const [activeStage, setActiveStage] = useState(0);

  // ── Quiz state ──
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [stageScore, setStageScore] = useState(0);
  const [stageCorrect, setStageCorrect] = useState<ExerciseQuestion[]>([]);

  // ── Modal ──
  const [showModal, setShowModal] = useState(false);

  // ── Derived ──
  const stageQs = questions.slice(activeStage * STAGE_SIZE, (activeStage + 1) * STAGE_SIZE);
  const q = stageQs[step];
  const total = stageQs.length;
  const answered = selected !== null;
  const isCorrect = answered && selected === q?.correctIndex;

  // Update the active stage's saved record (functional form to avoid stale closure)
  const updateRecord = (updater: (r: StageRecord) => StageRecord) => {
    setProgress((prev) => {
      const current: StageRecord = prev.stages[activeStage] ?? {
        questionIndex: 0,
        score: 0,
        correctIds: [],
        completed: false,
      };
      return {
        ...prev,
        stages: { ...prev.stages, [activeStage]: updater(current) },
      };
    });
  };

  // ── Quiz actions ──

  const choose = (idx: number) => {
    if (answered || !q) return;
    setSelected(idx);
    if (idx === q.correctIndex && firstAttempt) {
      setStageScore((s) => s + 1);
      setStageCorrect((prev) => [...prev, q]);
      updateRecord((r) => ({
        ...r,
        score: r.score + 1,
        correctIds: [...r.correctIds, q.id],
      }));
    }
    if (idx !== q.correctIndex) setFirstAttempt(false);
  };

  const next = () => {
    if (step + 1 >= total) {
      updateRecord((r) => ({ ...r, completed: true, questionIndex: total }));
      setView("stage-done");
    } else {
      const ns = step + 1;
      setStep(ns);
      setSelected(null);
      setFirstAttempt(true);
      updateRecord((r) => ({ ...r, questionIndex: ns }));
    }
  };

  // ── Stage navigation ──

  const enterStage = (idx: number) => {
    const rec = progress.stages[idx];
    const isCompleted = rec?.completed ?? false;

    if (isCompleted) {
      setProgress((prev) => ({
        ...prev,
        stages: {
          ...prev.stages,
          [idx]: { questionIndex: 0, score: 0, correctIds: [], completed: false },
        },
      }));
      setStep(0);
      setStageScore(0);
      setStageCorrect([]);
    } else {
      const qi = rec?.questionIndex ?? 0;
      const savedIds = new Set(rec?.correctIds ?? []);
      const qs = questions.slice(idx * STAGE_SIZE, (idx + 1) * STAGE_SIZE);
      setStep(qi);
      setStageScore(rec?.score ?? 0);
      setStageCorrect(qs.filter((item) => savedIds.has(item.id)));
    }

    setActiveStage(idx);
    setSelected(null);
    setFirstAttempt(true);
    setView("quiz");
  };

  // ── All correct answers across all stages (for stages-view modal) ──
  const allCorrect = Object.entries(progress.stages).flatMap(([idxStr, rec]) => {
    const idx = Number(idxStr);
    const qs = questions.slice(idx * STAGE_SIZE, (idx + 1) * STAGE_SIZE);
    const ids = new Set(rec.correctIds);
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
          Close
        </Button>
      }
      title={
        <span style={{ color: "#3a9a5c", fontWeight: 700 }}>
          ✓ Correct Answers —{" "}
          {view === "stages"
            ? `${allCorrect.length} total`
            : `${stageCorrect.length}/${total} in Stage ${activeStage + 1}`}
        </span>
      }
      width={640}
      styles={{ body: { maxHeight: "60vh", overflowY: "auto", padding: "16px 0" } }}
    >
      {modalItems.length === 0 ? (
        <Text style={{ color: "#8a97a3" }}>No correct answers yet.</Text>
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
    const scoreColor = pct >= 80 ? "#3a9a5c" : pct >= 50 ? "#e07b39" : "#d94a4a";
    const hasNext = activeStage + 1 < totalStages;

    return (
      <div style={{ padding: "40px 16px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        {correctModal}
        <Title level={3} style={{ color: "#5b6b7a" }}>
          Stage {activeStage + 1} Complete!
        </Title>
        <div style={{ fontSize: 56, fontWeight: 700, color: scoreColor, margin: "16px 0 8px" }}>
          {stageScore}/{total}
        </div>
        <Progress percent={pct} strokeColor={scoreColor} showInfo={false}
          style={{ maxWidth: 300, margin: "0 auto 24px" }} />
        <Text style={{ fontSize: 16, color: "#6b7580" }}>
          {pct >= 80
            ? "Excellent! You have mastered this stage."
            : pct >= 50
            ? "Good job! Review the questions you got wrong."
            : "Keep trying! Read the explanations and try again."}
        </Text>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          {hasNext && (
            <Button type="primary" size="large"
              onClick={() => enterStage(activeStage + 1)}
              style={{ borderRadius: 10, background: accent, borderColor: accent }}>
              Next Stage →
            </Button>
          )}
          <Button
            icon={<CheckCircleOutlined />}
            size="large"
            onClick={() => setShowModal(true)}
            disabled={stageCorrect.length === 0}
            style={{ borderRadius: 10, borderColor: accent, color: stageCorrect.length > 0 ? accent : undefined }}
          >
            Correct Answers ({stageCorrect.length})
          </Button>
          <Button size="large" onClick={() => setView("stages")} style={{ borderRadius: 10 }}>
            All Stages
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
              {title} · Stage {activeStage + 1} · Q {step + 1}/{total}
            </Text>
            <Progress percent={Math.round((step / total) * 100)}
              strokeColor={accent} showInfo={false} size="small" style={{ marginTop: 4 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Text style={{ color: accent, fontWeight: 600, fontSize: 14 }}>{stageScore} pts</Text>
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
                  {isCorrect ? "Correct!" : `Correct answer: ${q.options[q.correctIndex]}`}
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
            {step + 1 >= total ? "Finish Stage" : "Next Question →"}
          </Button>
        )}
      </div>
    );
  }

  // ── Stages selection view ────────────────────────────────────────────────

  return (
    <div style={{ padding: "16px 16px 40px", maxWidth: 680, margin: "0 auto" }}>
      {correctModal}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24, gap: 12 }}>
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={onBack}
          style={{ color: "#8a97a3" }} />
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0, color: "#2d3840" }}>{title}</Title>
          <Text style={{ color: "#8a97a3", fontSize: 13 }}>
            {totalStages} stages · {questions.length} questions
          </Text>
        </div>
        <Button
          icon={<CheckCircleOutlined />}
          onClick={() => setShowModal(true)}
          disabled={allCorrect.length === 0}
          style={{ borderColor: accent, color: allCorrect.length > 0 ? accent : undefined }}
        >
          Correct ({allCorrect.length})
        </Button>
      </div>

      {/* Stage grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {Array.from({ length: totalStages }, (_, idx) => {
          const rec = progress.stages[idx];
          const isCompleted = rec?.completed ?? false;
          const isInProgress = !isCompleted && (rec?.questionIndex ?? 0) > 0;
          const qi = rec?.questionIndex ?? 0;
          const stScore = rec?.score ?? 0;

          let cardBg = "#f8f9fa";
          let cardBorder = "1.5px solid #e0e8f0";
          let titleColor = "#6b7580";
          let statusText = "Not started";
          let statusColor = "#8a97a3";

          if (isCompleted) {
            cardBg = "#f0faf4";
            cardBorder = "1.5px solid #3a9a5c66";
            titleColor = "#1e6e3a";
            statusText = `${stScore}/${STAGE_SIZE} ✓`;
            statusColor = "#3a9a5c";
          } else if (isInProgress) {
            cardBg = color;
            cardBorder = `1.5px solid ${accent}66`;
            titleColor = accent;
            statusText = `Q ${qi + 1}/${STAGE_SIZE} · ${stScore} pts`;
            statusColor = accent;
          }

          const startQ = idx * STAGE_SIZE + 1;
          const endQ = Math.min((idx + 1) * STAGE_SIZE, questions.length);

          return (
            <button
              key={idx}
              onClick={() => enterStage(idx)}
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 14,
                padding: "18px 16px",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                width: "100%",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16, color: titleColor, marginBottom: 2 }}>
                Stage {idx + 1}
              </div>
              <div style={{ fontSize: 12, color: "#8a97a3", marginBottom: 8 }}>
                Q {startQ}–{endQ}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: statusColor }}>
                {statusText}
              </div>
              {isInProgress && (
                <Progress
                  percent={Math.round((qi / STAGE_SIZE) * 100)}
                  strokeColor={accent}
                  showInfo={false}
                  size="small"
                  style={{ marginTop: 8, marginBottom: 0 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
