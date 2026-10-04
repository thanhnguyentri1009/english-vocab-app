import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { LevelInfo } from "../data/english/vocabulary/topics";
import PageHeader from "./PageHeader";

interface LevelSelectProps {
  topicTitle: string;
  topicSubtitle: string;
  levels: LevelInfo[];
  // Only `.length` is ever read — loosened from `VocabularyWord[]` so this
  // component can be reused for the Japanese and Chinese level pickers too.
  vocabulary: Record<string, unknown[]>;
  onSelect: (levelKey: string) => void;
  learnedWords: Partial<Record<string, string[]>>;
  onBackToTopics?: () => void;
}

// Short codes (A1, N5, HSK 1, 7.0+) read best as a large numeral; names
// (Time, Daily Life) as an ordinary title.
function isCode(title: string) {
  return title.length <= 7 && !/[a-z]/.test(title);
}

export default function LevelSelect({
  topicTitle,
  topicSubtitle,
  levels,
  vocabulary,
  onSelect,
  learnedWords,
  onBackToTopics,
}: LevelSelectProps) {
  const { t, i18n } = useTranslation();
  const nf = new Intl.NumberFormat(i18n.language);
  return (
    <div className="page page-wide">
      <PageHeader
        eyebrow={t("eyebrow.levels")}
        title={topicTitle}
        subtitle={topicSubtitle}
        backLabel={t("levelSelect.topics")}
        onBack={onBackToTopics}
      />
      <div className="choice-grid">
        {levels.map((level) => {
          const learned = learnedWords[level.key]?.length ?? 0;
          const total = vocabulary[level.key]?.length ?? 0;
          const percent = total > 0 ? Math.min(100, (learned / total) * 100) : 0;
          return (
            <button key={level.key} type="button" className="choice" onClick={() => onSelect(level.key)}>
              <ArrowRightOutlined className="choice-arrow" />
              <span className={isCode(level.title) ? "choice-code" : "choice-title"}>{level.title}</span>
              <span className="choice-sub">{level.subtitle}</span>
              <span className="choice-meta-progress">
                <span className="meter">
                  <span style={{ width: `${percent}%` }} />
                </span>
                <span className="meter-label">
                  <span>{t("levelSelect.words", { learned: nf.format(learned), total: nf.format(total) })}</span>
                  <span>{Math.round(percent)}%</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
