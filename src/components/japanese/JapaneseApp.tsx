import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import AlphabetSelect from "./AlphabetSelect";
import AlphabetTable from "./AlphabetTable";
import JapaneseLevelDetail from "./JapaneseLevelDetail";
import JapaneseQuiz from "./JapaneseQuiz";
import JapaneseReview from "./JapaneseReview";
import JapaneseWordLearn from "./JapaneseWordLearn";
import LevelSelect from "../LevelSelect";
import type { AlphabetSet } from "../../data/japanese/alphabet";
import { JAPANESE_LEVELS } from "../../data/japanese/levels";
import { JAPANESE_VOCABULARY } from "../../data/japanese/vocabulary";
import type { JlptLevel } from "../../data/japanese/types";
import {
  loadJapaneseProgress,
  pushJapaneseRemoteProgress,
  saveJapaneseProgress,
  subscribeJapaneseRemoteProgress,
  type JapaneseProgressState,
} from "../../utils/japanese/progress";

const DEFAULT_BATCH_SIZE = 6;
const ALPHABET_SETS: AlphabetSet[] = ["hiragana", "katakana", "kanji"];

type JapaneseStage =
  | "alphabetSelect"
  | "alphabetTable"
  | "vocabLevelSelect"
  | "vocabLevelDetail"
  | "vocabLearn"
  | "vocabQuiz"
  | "vocabReview";

interface JapaneseAppProps {
  syncCode: string;
  displayName: string;
  onSwitchAccount: () => void;
}

export default function JapaneseApp({ syncCode, displayName, onSwitchAccount }: JapaneseAppProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // location.pathname is "/jp[/...]" — segments here are everything after "jp".
  const allSegments = location.pathname.split("/").filter(Boolean);
  const segments = allSegments[0] === "jp" ? allSegments.slice(1) : [];

  const section = segments[0]; // undefined | 'alphabet' | 'vocabulary'
  const alphabetSetKey = section === "alphabet" ? (segments[1] as AlphabetSet | undefined) : undefined;
  const alphabetSet = alphabetSetKey && ALPHABET_SETS.includes(alphabetSetKey) ? alphabetSetKey : null;

  const rawLevel = section === "vocabulary" ? segments[1] : undefined;
  const matchedLevel = rawLevel
    ? JAPANESE_LEVELS.find((l) => l.key.toLowerCase() === rawLevel.toLowerCase())
    : undefined;
  const levelKey = (matchedLevel?.key ?? null) as JlptLevel | null;
  const subRoute = section === "vocabulary" ? segments[2] : undefined;

  const stage: JapaneseStage =
    section === "alphabet"
      ? alphabetSet
        ? "alphabetTable"
        : "alphabetSelect"
      : section === "vocabulary"
        ? !levelKey
          ? "vocabLevelSelect"
          : subRoute === "quiz"
            ? "vocabQuiz"
            : subRoute === "learn"
              ? "vocabLearn"
              : subRoute === "review"
                ? "vocabReview"
                : "vocabLevelDetail"
        : "alphabetSelect";

  const activeTab: "alphabet" | "vocabulary" = section === "vocabulary" ? "vocabulary" : "alphabet";
  const showTabBar = stage === "alphabetSelect" || stage === "vocabLevelSelect";

  // Redirect unknown routes back to a sane place within /jp.
  useEffect(() => {
    if (section === "alphabet" && segments[1] && !alphabetSet) {
      navigate("/jp/alphabet", { replace: true });
    } else if (section === "vocabulary" && segments[1] && !levelKey) {
      navigate("/jp/vocabulary", { replace: true });
    } else if (section && section !== "alphabet" && section !== "vocabulary") {
      navigate("/jp", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, segments[1], alphabetSet, levelKey]);

  const [progress, setProgress] = useState<JapaneseProgressState>(() => loadJapaneseProgress(syncCode));
  const [batchSize, setBatchSize] = useState(() => progress.batchSize ?? DEFAULT_BATCH_SIZE);

  const appliedRemoteRef = useRef(false);
  const autoResumedRef = useRef(false);
  const remoteSyncedRef = useRef(false);

  useEffect(() => {
    saveJapaneseProgress(syncCode, progress);
  }, [syncCode, progress]);

  useEffect(() => {
    remoteSyncedRef.current = false;
    const unsubscribe = subscribeJapaneseRemoteProgress(syncCode, (remoteState) => {
      remoteSyncedRef.current = true;
      setProgress((current) => {
        const remoteTime = remoteState.updatedAt ?? 0;
        const localTime = current.updatedAt ?? 0;
        if (remoteTime < localTime) {
          pushJapaneseRemoteProgress(syncCode, current);
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

  // Resuming a saved vocabulary session only applies at the /jp root.
  useEffect(() => {
    if (autoResumedRef.current) return;
    if (location.pathname !== "/jp") return;
    const session = progress.session;
    if (!session) return;
    autoResumedRef.current = true;
    const suffix =
      session.screen === "learn" ? "/learn" : session.screen === "quiz" ? "/quiz" : "";
    navigate(`/jp/vocabulary/${session.level.toLowerCase()}${suffix}`, { replace: true });
  }, [progress.session, location.pathname, navigate]);

  const level = levelKey ? JAPANESE_LEVELS.find((l) => l.key === levelKey) : undefined;
  const pool = levelKey ? JAPANESE_VOCABULARY[levelKey] ?? [] : [];
  const learnedWords = (levelKey && progress.learnedWords[levelKey]) || [];
  const resumeWordIndex =
    levelKey && progress.session?.level === levelKey ? progress.session.wordIndex : 0;

  const learnedSet = useMemo(() => new Set(learnedWords), [learnedWords]);
  const batch = useMemo(() => {
    if (!pool.length) return [];
    return pool.filter((w) => !learnedSet.has(w.id)).slice(0, batchSize);
  }, [pool, learnedSet, batchSize]);
  const reviewWords = useMemo(() => pool.filter((w) => learnedSet.has(w.id)), [pool, learnedSet]);

  const updateProgress = (updater: (p: JapaneseProgressState) => JapaneseProgressState) => {
    setProgress((prev) => {
      const next = { ...updater(prev), updatedAt: Date.now() };
      saveJapaneseProgress(syncCode, next);
      if (remoteSyncedRef.current) {
        pushJapaneseRemoteProgress(syncCode, next);
      }
      return next;
    });
  };

  const persistSession = (session: JapaneseProgressState["session"]) => {
    updateProgress((p) => ({ ...p, session }));
  };

  const handleChangeBatchSize = (size: number) => {
    setBatchSize(size);
    updateProgress((p) => ({ ...p, batchSize: size }));
  };

  const handleSelectLevel = (key: string) => {
    const wordIndex = progress.session?.level === key ? progress.session.wordIndex : 0;
    navigate(`/jp/vocabulary/${key.toLowerCase()}`);
    persistSession({ level: key as JlptLevel, screen: "levelDetail", wordIndex });
  };

  const handleBackToLevels = () => {
    navigate("/jp/vocabulary");
    updateProgress((p) => ({ ...p, session: undefined }));
  };

  const handleBackToDetail = () => {
    if (!levelKey) return;
    navigate(`/jp/vocabulary/${levelKey.toLowerCase()}`);
    persistSession({ level: levelKey, screen: "levelDetail", wordIndex: resumeWordIndex });
  };

  const handleContinueLearning = () => {
    if (!levelKey) return;
    navigate(`/jp/vocabulary/${levelKey.toLowerCase()}/learn`);
    persistSession({ level: levelKey, screen: "learn", wordIndex: resumeWordIndex });
  };

  const handleWordIndexChange = (wordIndex: number) => {
    if (!levelKey) return;
    persistSession({ level: levelKey, screen: "learn", wordIndex });
  };

  const handleFinishLearn = () => {
    if (!levelKey) return;
    navigate(`/jp/vocabulary/${levelKey.toLowerCase()}/quiz`);
    persistSession({ level: levelKey, screen: "quiz", wordIndex: 0 });
  };

  const handleQuizComplete = () => {
    if (!levelKey) return;
    const updatedSet = new Set(progress.learnedWords[levelKey] ?? []);
    batch.forEach((w) => updatedSet.add(w.id));
    const updatedLearnedWords = Array.from(updatedSet);
    updateProgress((p) => ({
      ...p,
      learnedWords: { ...p.learnedWords, [levelKey]: updatedLearnedWords },
      session: { level: levelKey, screen: "quiz", wordIndex: 0 },
    }));
  };

  const handleNextBatch = () => {
    if (!levelKey) return;
    navigate(`/jp/vocabulary/${levelKey.toLowerCase()}/learn`);
    persistSession({ level: levelKey, screen: "learn", wordIndex: 0 });
  };

  const handleStartReview = () => {
    if (!levelKey) return;
    navigate(`/jp/vocabulary/${levelKey.toLowerCase()}/review`);
  };

  const handleBackFromReview = () => {
    if (!levelKey) return;
    navigate(`/jp/vocabulary/${levelKey.toLowerCase()}`);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: level?.accent || "#d97aa0",
          fontFamily: "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
          borderRadius: 12,
        },
      }}
    >
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f4f7fb 0%, #fbfcfe 220px)" }}>
      {showTabBar && (
        <JapaneseTabBar
          active={activeTab}
          onChange={(tab) => navigate(tab === "alphabet" ? "/jp/alphabet" : "/jp/vocabulary")}
        />
      )}

      {stage === "alphabetSelect" && (
        <AlphabetSelect onSelect={(set) => navigate(`/jp/alphabet/${set}`)} />
      )}
      {stage === "alphabetTable" && alphabetSet && (
        <AlphabetTable set={alphabetSet} onBack={() => navigate("/jp/alphabet")} />
      )}
      {stage === "vocabLevelSelect" && (
        <LevelSelect
          topicTitle={t("japanese.levelSelect.title")}
          topicSubtitle={t("japanese.levelSelect.subtitle")}
          levels={JAPANESE_LEVELS}
          vocabulary={JAPANESE_VOCABULARY}
          onSelect={handleSelectLevel}
          learnedWords={progress.learnedWords}
          syncCode={displayName}
          onSwitchAccount={onSwitchAccount}
          onBackToTopics={() => navigate("/jp/alphabet")}
        />
      )}
      {stage === "vocabLevelDetail" && level && (
        <JapaneseLevelDetail
          level={level}
          pool={pool}
          learnedWords={learnedWords}
          batchSize={batchSize}
          onChangeBatchSize={handleChangeBatchSize}
          onContinue={handleContinueLearning}
          onReview={handleStartReview}
          onBack={handleBackToLevels}
        />
      )}
      {stage === "vocabLearn" && level && (
        <JapaneseWordLearn
          words={batch}
          accent={level.accent}
          initialIndex={resumeWordIndex}
          onIndexChange={handleWordIndexChange}
          onFinish={handleFinishLearn}
          onBack={handleBackToDetail}
        />
      )}
      {stage === "vocabQuiz" && level && (
        <JapaneseQuiz
          words={batch}
          pool={pool}
          accent={level.accent}
          onComplete={handleQuizComplete}
          onDone={handleNextBatch}
          onBack={handleBackToDetail}
        />
      )}
      {stage === "vocabReview" && level && (
        <JapaneseReview words={reviewWords} pool={pool} accent={level.accent} onBack={handleBackFromReview} />
      )}
    </div>
    </ConfigProvider>
  );
}

function JapaneseTabBar({
  active,
  onChange,
}: {
  active: "alphabet" | "vocabulary";
  onChange: (tab: "alphabet" | "vocabulary") => void;
}) {
  const { t } = useTranslation();
  const tabs: { key: "alphabet" | "vocabulary"; labelKey: string }[] = [
    { key: "alphabet", labelKey: "japanese.tabs.alphabet" },
    { key: "vocabulary", labelKey: "japanese.tabs.vocabulary" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px 16px 0", gap: 4 }}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              border: "none",
              background: isActive ? "#d97aa0" : "rgba(0,0,0,0.06)",
              color: isActive ? "#fff" : "#6b7a8a",
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {t(tab.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
