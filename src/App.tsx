import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import ExerciseQuiz from "./components/ExerciseQuiz";
import LevelDetail from "./components/LevelDetail";
import LevelSelect from "./components/LevelSelect";
import Quiz from "./components/Quiz";
import SpeakingLevelSelect from "./components/SpeakingLevelSelect";
import SpeakingSession from "./components/SpeakingSession";
import SyncCodeGate from "./components/SyncCodeGate";
import TopicSelect from "./components/TopicSelect";
import WordLearn from "./components/WordLearn";
import {
  GRAMMAR_CATEGORIES,
  WORD_TYPE_CATEGORIES,
} from "./data/exercises";
import { SPEAKING_LEVELS } from "./data/speaking/sentences";
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
type ExerciseSection = "grammar" | "word-types";

type Stage =
  | "topicSelect"
  | "select"
  | "levelDetail"
  | "learn"
  | "quiz"
  | "exerciseQuiz"
  | "speakingHome"
  | "speakingSession";

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

  const segments = location.pathname.split("/").filter(Boolean);
  const rawTopic = segments[0];

  // Determine if this is a speaking section
  const isSpeaking = rawTopic === "speaking";
  const speakingLevelKey = isSpeaking ? segments[1]?.toLowerCase() : undefined;
  const speakingLevel = speakingLevelKey
    ? SPEAKING_LEVELS.find((l) => l.key === speakingLevelKey)
    : undefined;

  // Determine if this is an exercise section (grammar / word-types) — each
  // section is a single mixed pool now, so there's no per-category route.
  const exerciseSection: ExerciseSection | null =
    rawTopic === "grammar" || rawTopic === "word-types" ? rawTopic : null;

  // Resolve the exercise category object
  const exerciseCategories = exerciseSection === "grammar" ? GRAMMAR_CATEGORIES : WORD_TYPE_CATEGORIES;
  const exerciseCategory = exerciseSection ? exerciseCategories[0] : undefined;

  // Vocabulary routing (unchanged)
  const topicKey = (TOPICS.some((t) => t.key === rawTopic) ? rawTopic : null) as Topic | null;
  const rawLevel = segments[1];
  const levels = topicKey ? getLevelsForTopic(topicKey) : [];
  const matchedLevel = topicKey
    ? levels.find((l) => l.key.toLowerCase() === rawLevel?.toLowerCase())
    : undefined;
  const levelKey = matchedLevel ? matchedLevel.key : null;
  const subRoute = segments[2];

  const stage: Stage = isSpeaking
    ? speakingLevelKey && speakingLevel
      ? "speakingSession"
      : "speakingHome"
    : exerciseSection
      ? "exerciseQuiz"
      : !topicKey
        ? "topicSelect"
        : !levelKey
          ? "select"
          : subRoute === "quiz"
            ? "quiz"
            : subRoute === "learn"
              ? "learn"
              : "levelDetail";

  // Redirect unknown routes
  useEffect(() => {
    if (segments[0] && !topicKey && !exerciseSection && !isSpeaking) {
      navigate("/", { replace: true });
    } else if (topicKey && segments[1] && !levelKey) {
      navigate(`/${topicKey}`, { replace: true });
    } else if (exerciseSection && segments[1]) {
      // Old per-category routes (e.g. /grammar/tenses) no longer exist —
      // each section is now a single mixed pool.
      navigate(`/${exerciseSection}`, { replace: true });
    } else if (isSpeaking && speakingLevelKey && !speakingLevel) {
      navigate("/speaking", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments[0], segments[1], topicKey, levelKey, exerciseSection, isSpeaking, speakingLevelKey]);

  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(syncCode));
  const [batchSize, setBatchSize] = useState(() => progress.batchSize ?? DEFAULT_BATCH_SIZE);

  const appliedRemoteRef = useRef(false);
  const autoResumedRef = useRef(false);
  const remoteSyncedRef = useRef(false);

  useEffect(() => {
    saveProgress(syncCode, progress);
  }, [syncCode, progress]);

  useEffect(() => {
    remoteSyncedRef.current = false;
    const unsubscribe = subscribeRemoteProgress(syncCode, (remoteState) => {
      remoteSyncedRef.current = true;
      setProgress((current) => {
        const remoteTime = remoteState.updatedAt ?? 0;
        const localTime = current.updatedAt ?? 0;
        if (remoteTime < localTime) {
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

  const learnedSet = useMemo(() => new Set(learnedWords), [learnedWords]);
  const batch = useMemo(() => {
    if (!pool.length) return [];
    return pool.filter((w) => !learnedSet.has(w.en)).slice(0, batchSize);
  }, [pool, learnedSet, batchSize]);

  const updateProgress = (updater: (p: ProgressState) => ProgressState) => {
    setProgress((prev) => {
      const next = { ...updater(prev), updatedAt: Date.now() };
      saveProgress(syncCode, next);
      if (remoteSyncedRef.current) {
        pushRemoteProgress(syncCode, next);
      }
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

  const handleSelectTopic = (topic: Topic) => navigate(`/${topic}`);

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

  // Determine active main tab
  const activeTab = isSpeaking ? "speaking" : (exerciseSection ?? "vocabulary");

  // Which stages show the main tab bar
  const showTabBar = stage === "topicSelect" || stage === "speakingHome";

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: level?.accent || "#7aa7d9",
          fontFamily: "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
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
        {/* Main tab bar (shown on home & exercise category screens) */}
        {showTabBar && (
          <MainTabBar
            active={activeTab}
            onChange={(tab) => {
              if (tab === "vocabulary") navigate("/");
              else navigate(`/${tab}`);
            }}
          />
        )}

        {stage === "topicSelect" && (
          <TopicSelect
            topics={TOPICS}
            onSelect={handleSelectTopic}
            syncCode={syncCode}
            onSwitchAccount={onSwitchAccount}
          />
        )}
        {stage === "exerciseQuiz" && exerciseSection && exerciseCategory && (
          <ExerciseQuiz
            category={exerciseCategory}
            onBack={() => navigate("/")}
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
        {stage === "speakingHome" && (
          <SpeakingLevelSelect
            levels={SPEAKING_LEVELS}
            onSelect={(key) => navigate(`/speaking/${key}`)}
          />
        )}
        {stage === "speakingSession" && speakingLevel && (
          <SpeakingSession
            level={speakingLevel}
            onBack={() => navigate("/speaking")}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

const TABS = [
  { key: "vocabulary", label: "Vocabulary" },
  { key: "grammar", label: "Grammar" },
  { key: "word-types", label: "Word Types" },
  { key: "speaking", label: "Speaking" },
] as const;

function MainTabBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 16px 0",
        gap: 4,
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              border: "none",
              background: isActive ? "#7aa7d9" : "rgba(0,0,0,0.06)",
              color: isActive ? "#fff" : "#6b7a8a",
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default App;
