import { ConfigProvider, theme } from "antd";
import { useMemo, useState } from "react";
import "./App.css";
import LevelSelect from "./components/LevelSelect";
import Quiz from "./components/Quiz";
import WordLearn from "./components/WordLearn";
import { CefrLevel, LEVELS, VOCABULARY } from "./data/vocabulary";

const BATCH_SIZE = 6;

type Stage = "select" | "learn" | "quiz";

function App() {
  const [levelKey, setLevelKey] = useState<CefrLevel | null>(null);
  const [batchIndex, setBatchIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("select");

  const level = LEVELS.find((l) => l.key === levelKey);
  const pool = levelKey ? VOCABULARY[levelKey] : [];

  const batch = useMemo(() => {
    if (!pool.length) return [];
    const start = (batchIndex * BATCH_SIZE) % pool.length;
    const slice = pool.slice(start, start + BATCH_SIZE);
    if (slice.length < BATCH_SIZE) {
      return [...slice, ...pool.slice(0, BATCH_SIZE - slice.length)];
    }
    return slice;
  }, [pool, batchIndex]);

  const handleSelectLevel = (key: CefrLevel) => {
    setLevelKey(key);
    setBatchIndex(0);
    setStage("learn");
  };

  const handleBackToLevels = () => {
    setStage("select");
    setLevelKey(null);
  };

  const handleFinishLearn = () => setStage("quiz");

  const handleNextBatch = () => {
    setBatchIndex((i) => i + 1);
    setStage("learn");
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: level?.accent || "#7aa7d9",
          fontFamily:
            "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
          borderRadius: 12,
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: level?.color
            ? `linear-gradient(180deg, ${level.color} 0%, #fbfcfe 220px)`
            : "linear-gradient(180deg, #f4f7fb 0%, #fbfcfe 220px)",
        }}
      >
        {stage === "select" && <LevelSelect onSelect={handleSelectLevel} />}
        {stage === "learn" && level && (
          <WordLearn
            words={batch}
            accent={level.accent}
            onFinish={handleFinishLearn}
            onBack={handleBackToLevels}
          />
        )}
        {stage === "quiz" && level && (
          <Quiz
            words={batch}
            pool={pool}
            accent={level.accent}
            onDone={handleNextBatch}
            onBack={handleBackToLevels}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
