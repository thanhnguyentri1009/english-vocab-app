import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import LevelDetail from "./components/LevelDetail";
import LevelSelect from "./components/LevelSelect";
import Quiz from "./components/Quiz";
import SyncCodeGate from "./components/SyncCodeGate";
import WordLearn from "./components/WordLearn";
import { CefrLevel, LEVELS, VOCABULARY } from "./data/vocabulary";
import {
  loadProgress,
  ProgressState,
  pushRemoteProgress,
  saveProgress,
  subscribeRemoteProgress,
} from "./utils/progress";
import { clearSyncCode, getSyncCode, setSyncCode } from "./utils/syncCode";

const BATCH_SIZE = 6;

type Stage = "select" | "levelDetail" | "learn" | "quiz";

const baseTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#7aa7d9",
    fontFamily: "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
    borderRadius: 12,
  },
};

function App() {
  const [syncCode, setSyncCodeState] = useState<string | null>(() => getSyncCode());

  if (!syncCode) {
    return (
      <ConfigProvider theme={baseTheme}>
        <SyncCodeGate
          onSubmit={(code) => {
            setSyncCode(code);
            setSyncCodeState(code);
          }}
        />
      </ConfigProvider>
    );
  }

  return (
    <VocabApp
      syncCode={syncCode}
      onSwitchAccount={() => {
        clearSyncCode();
        setSyncCodeState(null);
      }}
    />
  );
}

interface VocabAppProps {
  syncCode: string;
  onSwitchAccount: () => void;
}

function VocabApp({ syncCode, onSwitchAccount }: VocabAppProps) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(syncCode));
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
    saveProgress(syncCode, progress);
  }, [syncCode, progress]);

  // Listen for changes made from any other device using the same sync code.
  useEffect(() => {
    const unsubscribe = subscribeRemoteProgress(syncCode, (remoteState) => {
      setProgress((current) => {
        const remoteTime = remoteState.updatedAt ?? 0;
        const localTime = current.updatedAt ?? 0;
        if (remoteTime < localTime) {
          // Our local change hasn't reached Firestore yet (e.g. the page was
          // refreshed right after an action) — keep the newer local data and
          // re-push it so the remote copy catches up.
          pushRemoteProgress(syncCode, current);
          return current;
        }
        // Only jump to another device's in-progress session once, right
        // after the app opens — not while navigating locally.
        if (!appliedRemoteRef.current) {
          appliedRemoteRef.current = true;
          if (remoteState.session) {
            setLevelKey(remoteState.session.level);
            setBatchIndex(remoteState.session.batchIndex);
            setResumeWordIndex(remoteState.session.wordIndex);
            setStage(remoteState.session.screen);
          }
        }
        return remoteState;
      });
    });
    return unsubscribe;
  }, [syncCode]);

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
      const next = { ...updater(prev), updatedAt: Date.now() };
      saveProgress(syncCode, next);
      pushRemoteProgress(syncCode, next);
      return next;
    });
  };

  const persistSession = (session: ProgressState["session"]) => {
    updateProgress((p) => ({ ...p, session }));
  };

  const handleSelectLevel = (key: CefrLevel) => {
    // Resume exactly where they left off if that's this same level;
    // otherwise start from the first batch that hasn't been learned yet
    // (derived from the actual learned-word count, never hardcoded to 0).
    const existingSession = progress.session;
    const resumingSameLevel = existingSession?.level === key;
    const learnedCount = progress.learnedWords[key]?.length ?? 0;
    const nextBatchIndex = Math.floor(learnedCount / BATCH_SIZE);
    const resolvedBatchIndex = resumingSameLevel
      ? existingSession.batchIndex
      : nextBatchIndex;
    const resolvedWordIndex = resumingSameLevel ? existingSession.wordIndex : 0;

    setLevelKey(key);
    setBatchIndex(resolvedBatchIndex);
    setResumeWordIndex(resolvedWordIndex);
    setStage("levelDetail");
    persistSession({
      level: key,
      screen: "levelDetail",
      batchIndex: resolvedBatchIndex,
      wordIndex: resolvedWordIndex,
    });
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

  // Runs exactly once as soon as the quiz for the current batch finishes,
  // regardless of which button the user taps afterwards (or if they leave
  // without tapping anything) — so progress is never lost.
  const handleQuizComplete = () => {
    if (!levelKey) return;
    const learnedSet = new Set(progress.learnedWords[levelKey] ?? []);
    batch.forEach((w) => learnedSet.add(w.en));
    const updatedLearnedWords = Array.from(learnedSet);
    // Derived from the actual learned-word count (a Set, so adding the same
    // batch twice is harmless) rather than "batchIndex + 1", so this can
    // never drift out of sync even if this handler somehow ran twice.
    const nextBatchIndex = Math.floor(updatedLearnedWords.length / BATCH_SIZE);
    setBatchIndex(nextBatchIndex);
    setResumeWordIndex(0);
    updateProgress((p) => ({
      learnedWords: { ...p.learnedWords, [levelKey]: updatedLearnedWords },
      session: { level: levelKey, screen: "quiz", batchIndex: nextBatchIndex, wordIndex: 0 },
    }));
  };

  const handleNextBatch = () => {
    if (!levelKey) return;
    setStage("learn");
    persistSession({ level: levelKey, screen: "learn", batchIndex, wordIndex: 0 });
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
          <LevelSelect
            onSelect={handleSelectLevel}
            learnedWords={progress.learnedWords}
            syncCode={syncCode}
            onSwitchAccount={onSwitchAccount}
          />
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
            onComplete={handleQuizComplete}
            onDone={handleNextBatch}
            onBack={handleBackToDetail}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
