import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
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

const DEFAULT_BATCH_SIZE = 6;

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

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {!syncCode ? (
        <ConfigProvider theme={baseTheme}>
          <SyncCodeGate
            onSubmit={(code) => {
              setSyncCode(code);
              setSyncCodeState(code);
            }}
          />
        </ConfigProvider>
      ) : (
        <VocabApp
          syncCode={syncCode}
          onSwitchAccount={() => {
            clearSyncCode();
            setSyncCodeState(null);
          }}
        />
      )}
    </BrowserRouter>
  );
}

interface VocabAppProps {
  syncCode: string;
  onSwitchAccount: () => void;
}

function VocabApp({ syncCode, onSwitchAccount }: VocabAppProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse the URL ourselves (e.g. "/b1", "/b1/learn", "/b1/quiz") instead of
  // using nested <Route>s, so this single component stays mounted across
  // every navigation — its Firestore subscription and local state must not
  // reset just because the path changed.
  const segments = location.pathname.split("/").filter(Boolean);
  const rawLevel = segments[0]?.toUpperCase();
  const levelKey = (LEVELS.some((l) => l.key === rawLevel) ? rawLevel : null) as
    | CefrLevel
    | null;
  const subRoute = segments[1];
  const stage: Stage = !levelKey
    ? "select"
    : subRoute === "quiz"
      ? "quiz"
      : subRoute === "learn"
        ? "learn"
        : "levelDetail";

  // If someone visits an unknown level slug directly, send them back home.
  useEffect(() => {
    if (segments[0] && !levelKey) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments[0], levelKey]);

  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(syncCode));
  const [batchSize, setBatchSize] = useState(() => progress.batchSize ?? DEFAULT_BATCH_SIZE);

  const appliedRemoteRef = useRef(false);
  const autoResumedRef = useRef(false);

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
        if (!appliedRemoteRef.current) {
          appliedRemoteRef.current = true;
          if (remoteState.batchSize) setBatchSize(remoteState.batchSize);
        }
        return remoteState;
      });
    });
    return unsubscribe;
  }, [syncCode]);

  // Jump straight back into whatever was last being learned (possibly on a
  // different device) — but only right after opening the app at "/", never
  // overriding a URL the user actually navigated to themselves.
  useEffect(() => {
    if (autoResumedRef.current) return;
    if (location.pathname !== "/") return;
    const session = progress.session;
    if (!session) return;
    autoResumedRef.current = true;
    const suffix =
      session.screen === "learn" ? "/learn" : session.screen === "quiz" ? "/quiz" : "";
    navigate(`/${session.level.toLowerCase()}${suffix}`, { replace: true });
  }, [progress.session, location.pathname, navigate]);

  const level = LEVELS.find((l) => l.key === levelKey);
  const pool = levelKey ? VOCABULARY[levelKey] : [];
  const learnedWords = (levelKey && progress.learnedWords[levelKey]) || [];
  const resumeWordIndex =
    levelKey && progress.session?.level === levelKey ? progress.session.wordIndex : 0;

  // The current batch is always the next `batchSize` words that haven't
  // been learned yet — no separate index to keep in sync, so changing
  // batchSize or the learned-word count can never make this drift.
  const learnedSet = useMemo(() => new Set(learnedWords), [learnedWords]);
  const batch = useMemo(() => {
    if (!pool.length) return [];
    return pool.filter((w) => !learnedSet.has(w.en)).slice(0, batchSize);
  }, [pool, learnedSet, batchSize]);

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

  const handleChangeBatchSize = (size: number) => {
    setBatchSize(size);
    updateProgress((p) => ({ ...p, batchSize: size }));
  };

  const handleSelectLevel = (key: CefrLevel) => {
    const wordIndex = progress.session?.level === key ? progress.session.wordIndex : 0;
    navigate(`/${key.toLowerCase()}`);
    persistSession({ level: key, screen: "levelDetail", wordIndex });
  };

  const handleBackToLevels = () => {
    navigate("/");
    updateProgress((p) => ({ ...p, session: undefined }));
  };

  const handleBackToDetail = () => {
    if (!levelKey) return;
    navigate(`/${levelKey.toLowerCase()}`);
    persistSession({ level: levelKey, screen: "levelDetail", wordIndex: resumeWordIndex });
  };

  const handleContinueLearning = () => {
    if (!levelKey) return;
    navigate(`/${levelKey.toLowerCase()}/learn`);
    persistSession({ level: levelKey, screen: "learn", wordIndex: resumeWordIndex });
  };

  const handleWordIndexChange = (wordIndex: number) => {
    if (!levelKey) return;
    persistSession({ level: levelKey, screen: "learn", wordIndex });
  };

  const handleFinishLearn = () => {
    if (!levelKey) return;
    navigate(`/${levelKey.toLowerCase()}/quiz`);
    persistSession({ level: levelKey, screen: "quiz", wordIndex: 0 });
  };

  // Runs exactly once as soon as the quiz for the current batch finishes,
  // regardless of which button the user taps afterwards (or if they leave
  // without tapping anything) — so progress is never lost.
  const handleQuizComplete = () => {
    if (!levelKey) return;
    const updatedSet = new Set(progress.learnedWords[levelKey] ?? []);
    batch.forEach((w) => updatedSet.add(w.en));
    const updatedLearnedWords = Array.from(updatedSet);
    updateProgress((p) => ({
      ...p,
      learnedWords: { ...p.learnedWords, [levelKey]: updatedLearnedWords },
      session: { level: levelKey, screen: "quiz", wordIndex: 0 },
    }));
  };

  const handleNextBatch = () => {
    if (!levelKey) return;
    navigate(`/${levelKey.toLowerCase()}/learn`);
    persistSession({ level: levelKey, screen: "learn", wordIndex: 0 });
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
            batchSize={batchSize}
            onChangeBatchSize={handleChangeBatchSize}
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
