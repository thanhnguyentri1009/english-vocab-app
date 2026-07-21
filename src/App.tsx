import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import LevelDetail from "./components/LevelDetail";
import LevelSelect from "./components/LevelSelect";
import Quiz from "./components/Quiz";
import SyncCodeGate from "./components/SyncCodeGate";
import TopicSelect from "./components/TopicSelect";
import WordLearn from "./components/WordLearn";
import {
  findTopicForLevel,
  getLevelsForTopic,
  getVocabularyForTopic,
  Topic,
  TOPICS,
} from "./data/vocabulary";
import {
  loadProgress,
  ProgressState,
  pushRemoteProgress,
  saveProgress,
  subscribeRemoteProgress,
} from "./utils/progress";
import { clearSyncCode, getSyncCode, setSyncCode } from "./utils/syncCode";

const DEFAULT_BATCH_SIZE = 6;

type Stage = "topicSelect" | "select" | "levelDetail" | "learn" | "quiz";

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

  // Parse the URL ourselves (e.g. "/oxford/b1", "/oxford/b1/learn",
  // "/toeic/600-780/quiz") instead of using nested <Route>s, so this single
  // component stays mounted across every navigation — its Firestore
  // subscription and local state must not reset just because the path changed.
  const segments = location.pathname.split("/").filter(Boolean);
  const rawTopic = segments[0];
  const topicKey = (TOPICS.some((t) => t.key === rawTopic) ? rawTopic : null) as
    | Topic
    | null;
  const rawLevel = segments[1];
  const levels = topicKey ? getLevelsForTopic(topicKey) : [];
  // Level slugs in the URL are lowercased (e.g. "/oxford/b1"); level keys
  // themselves may not be (e.g. Oxford's "B1") — match case-insensitively,
  // then use the matched entry's real-cased key everywhere else.
  const matchedLevel = topicKey
    ? levels.find((l) => l.key.toLowerCase() === rawLevel?.toLowerCase())
    : undefined;
  const levelKey = matchedLevel ? matchedLevel.key : null;
  const subRoute = segments[2];
  const stage: Stage = !topicKey
    ? "topicSelect"
    : !levelKey
      ? "select"
      : subRoute === "quiz"
        ? "quiz"
        : subRoute === "learn"
          ? "learn"
          : "levelDetail";

  // If someone visits an unknown topic/level slug directly, send them back home.
  useEffect(() => {
    if (segments[0] && !topicKey) {
      navigate("/", { replace: true });
    } else if (topicKey && segments[1] && !levelKey) {
      navigate(`/${topicKey}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments[0], segments[1], topicKey, levelKey]);

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
    const sessionTopic = session.topic ?? findTopicForLevel(session.level) ?? "oxford";
    const suffix =
      session.screen === "learn" ? "/learn" : session.screen === "quiz" ? "/quiz" : "";
    navigate(`/${sessionTopic}/${session.level.toLowerCase()}${suffix}`, { replace: true });
  }, [progress.session, location.pathname, navigate]);

  const level = levelKey ? levels.find((l) => l.key === levelKey) : undefined;
  const vocabulary = topicKey ? getVocabularyForTopic(topicKey) : {};
  const pool = levelKey ? vocabulary[levelKey] ?? [] : [];
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

  const handleSelectTopic = (topic: Topic) => {
    navigate(`/${topic}`);
  };

  const handleSelectLevel = (key: string) => {
    if (!topicKey) return;
    const wordIndex = progress.session?.level === key ? progress.session.wordIndex : 0;
    navigate(`/${topicKey}/${key.toLowerCase()}`);
    persistSession({ topic: topicKey, level: key, screen: "levelDetail", wordIndex });
  };

  const handleBackToTopics = () => {
    navigate("/");
    updateProgress((p) => ({ ...p, session: undefined }));
  };

  const handleBackToLevels = () => {
    if (!topicKey) return;
    navigate(`/${topicKey}`);
    updateProgress((p) => ({ ...p, session: undefined }));
  };

  const handleBackToDetail = () => {
    if (!topicKey || !levelKey) return;
    navigate(`/${topicKey}/${levelKey.toLowerCase()}`);
    persistSession({ topic: topicKey, level: levelKey, screen: "levelDetail", wordIndex: resumeWordIndex });
  };

  const handleContinueLearning = () => {
    if (!topicKey || !levelKey) return;
    navigate(`/${topicKey}/${levelKey.toLowerCase()}/learn`);
    persistSession({ topic: topicKey, level: levelKey, screen: "learn", wordIndex: resumeWordIndex });
  };

  const handleWordIndexChange = (wordIndex: number) => {
    if (!topicKey || !levelKey) return;
    persistSession({ topic: topicKey, level: levelKey, screen: "learn", wordIndex });
  };

  const handleFinishLearn = () => {
    if (!topicKey || !levelKey) return;
    navigate(`/${topicKey}/${levelKey.toLowerCase()}/quiz`);
    persistSession({ topic: topicKey, level: levelKey, screen: "quiz", wordIndex: 0 });
  };

  // Runs exactly once as soon as the quiz for the current batch finishes,
  // regardless of which button the user taps afterwards (or if they leave
  // without tapping anything) — so progress is never lost.
  const handleQuizComplete = () => {
    if (!topicKey || !levelKey) return;
    const updatedSet = new Set(progress.learnedWords[levelKey] ?? []);
    batch.forEach((w) => updatedSet.add(w.en));
    const updatedLearnedWords = Array.from(updatedSet);
    updateProgress((p) => ({
      ...p,
      learnedWords: { ...p.learnedWords, [levelKey]: updatedLearnedWords },
      session: { topic: topicKey, level: levelKey, screen: "quiz", wordIndex: 0 },
    }));
  };

  const handleNextBatch = () => {
    if (!topicKey || !levelKey) return;
    navigate(`/${topicKey}/${levelKey.toLowerCase()}/learn`);
    persistSession({ topic: topicKey, level: levelKey, screen: "learn", wordIndex: 0 });
  };

  const topicInfo = topicKey ? TOPICS.find((t) => t.key === topicKey) : undefined;

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
        {stage === "topicSelect" && (
          <TopicSelect
            topics={TOPICS}
            onSelect={handleSelectTopic}
            syncCode={syncCode}
            onSwitchAccount={onSwitchAccount}
          />
        )}
        {stage === "select" && topicInfo && (
          <LevelSelect
            topicTitle={topicInfo.title}
            topicSubtitle={topicInfo.subtitle}
            levels={levels}
            vocabulary={vocabulary}
            onSelect={handleSelectLevel}
            learnedWords={progress.learnedWords}
            syncCode={syncCode}
            onSwitchAccount={onSwitchAccount}
            onBackToTopics={handleBackToTopics}
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
