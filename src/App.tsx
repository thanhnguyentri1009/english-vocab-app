import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import LevelDetail from "./components/LevelDetail";
import LevelSelect from "./components/LevelSelect";
import Quiz from "./components/Quiz";
import WordLearn from "./components/WordLearn";
import { CefrLevel, LEVELS, VOCABULARY } from "./data/vocabulary";
import {
  loadProgress,
  saveProgress,
  subscribeRemoteProgress,
  pushRemoteProgress,
  ProgressState,
} from "./utils/progress";

const BATCH_SIZE = 6;

type Stage = "select" | "levelDetail" | "learn" | "quiz";

function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [levelKey, setLevelKey] = useState<CefrLevel | null>(
    () => progress.session?.level ?? null,
  );
  const [batchIndex, setBatchIndex] = useState(() => progress.session?.batchIndex ?? 0);
  const [resumeWordIndex, setResumeWordIndex] = useState(
    () => progress.session?.wordIndex ?? 0,
  );
  const [stage, setStage] = useState<Stage>(() => progress.session?.screen ?? "select");

  const appliedRemoteRef = useRef(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Listen for changes made from any other device using the same sync code.
  useEffect(() => {
    const unsubscribe = subscribeRemoteProgress((remoteState) => {
      setProgress(remoteState);
      // Only jump to another device's in-progress session once, right after
      // the app opens — not while the user is actively navigating locally.
      if (!appliedRemoteRef.current) {
        appliedRemoteRef.current = true;
        if (remoteState.session) {
          setLevelKey(remoteState.session.level);
          setBatchIndex(remoteState.session.batchIndex);
          setResumeWordIndex(remoteState.session.wordIndex);
          setStage(remoteState.session.screen);
        }
      }
    });
    return unsubscribe;
  }, []);

  const level = LEVELS.find((l) => l.key === levelKey);
  const pool = levelKey ? VOCABULARY[levelKey] : [];
  const learnedWords = (levelKey && progress.learnedWords[levelKey]) || [];

  const batch = useMemo(() => {
    if (!pool.length) return [];
    const start = (batchIndex * BATCH_SIZE) % pool.length;
    const slice = pool.slice(start, start + BATCH_SIZE);
    if (slice.length < BATCH_SIZE) {
      return [...slice, ...pool.slice(0, BATCH_SIZE - slice.length)];
    }
    return slice;
  }, [pool, batchIndex]);

  // Any locally-triggered progress change is saved to localStorage and
  // pushed to Firestore so other devices using the same sync code see it.
  const updateProgress = (updater: (p: ProgressState) => ProgressState) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      pushRemoteProgress(next);
      return next;
    });
  };

  const persistSession = (session: ProgressState["session"]) => {
    updateProgress((p) => ({ ...p, session }));
  };

  const handleSelectLevel = (key: CefrLevel) => {
    setLevelKey(key);
    setBatchIndex(0);
    setResumeWordIndex(0);
    setStage("levelDetail");
    persistSession({ level: key, screen: "levelDetail", batchIndex: 0, wordIndex: 0 });
  };

  const handleBackToLevels = () => {
    setStage("select");
    setLevelKey(null);
    updateProgress((p) => ({ ...p, session: undefined }));
  };

  const handleBackToDetail = () => {
    if (!levelKey) return;
    setStage("levelDetail");
    persistSession({
      level: levelKey,
      screen: "levelDetail",
      batchIndex,
      wordIndex: resumeWordIndex,
    });
  };

  const handleContinueLearning = () => {
    if (!levelKey) return;
    setStage("learn");
    persistSession({ level: levelKey, screen: "learn", batchIndex, wordIndex: resumeWordIndex });
  };

  const handleWordIndexChange = (wordIndex: number) => {
    setResumeWordIndex(wordIndex);
    if (!levelKey) return;
    persistSession({ level: levelKey, screen: "learn", batchIndex, wordIndex });
  };

  const handleFinishLearn = () => {
    setStage("quiz");
    if (!levelKey) return;
    persistSession({ level: levelKey, screen: "quiz", batchIndex, wordIndex: 0 });
  };

  const handleNextBatch = () => {
    if (!levelKey) return;
    const learnedSet = new Set(progress.learnedWords[levelKey] ?? []);
    batch.forEach((w) => learnedSet.add(w.en));
    const nextBatchIndex = batchIndex + 1;
    setBatchIndex(nextBatchIndex);
    setResumeWordIndex(0);
    setStage("learn");
    updateProgress((p) => ({
      learnedWords: { ...p.learnedWords, [levelKey]: Array.from(learnedSet) },
      session: { level: levelKey, screen: "learn", batchIndex: nextBatchIndex, wordIndex: 0 },
    }));
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
        {stage === "select" && (
          <LevelSelect onSelect={handleSelectLevel} learnedWords={progress.learnedWords} />
        )}
        {stage === "levelDetail" && level && (
          <LevelDetail
            level={level}
            pool={pool}
            learnedWords={learnedWords}
            onContinue={handleContinueLearning}
            onBack={handleBackToLevels}
          />
        )}
        {stage === "learn" && level && (
          <WordLearn
            words={batch}
            accent={level.accent}
            initialIndex={resumeWordIndex}
            onIndexChange={handleWordIndexChange}
            onFinish={handleFinishLearn}
            onBack={handleBackToDetail}
          />
        )}
        {stage === "quiz" && level && (
          <Quiz
            words={batch}
            pool={pool}
            accent={level.accent}
            onDone={handleNextBatch}
            onBack={handleBackToDetail}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
