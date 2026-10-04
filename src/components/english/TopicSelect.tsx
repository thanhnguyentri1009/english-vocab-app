import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  getLevelsForTopic,
  getVocabularyForTopic,
  type Topic,
  type TopicInfo,
} from "../../data/english/vocabulary";
import PageHeader from "../PageHeader";

interface TopicSelectProps {
  topics: TopicInfo[];
  onSelect: (topic: Topic) => void;
}

function topicStats(topic: Topic) {
  const levels = getLevelsForTopic(topic);
  const vocabulary = getVocabularyForTopic(topic);
  const words = levels.reduce((sum, l) => sum + (vocabulary[l.key]?.length ?? 0), 0);
  return { levels: levels.length, words };
}

export default function TopicSelect({ topics, onSelect }: TopicSelectProps) {
  const { t, i18n } = useTranslation();
  const nf = new Intl.NumberFormat(i18n.language);
  return (
    <div className="page page-wide">
      <PageHeader
        eyebrow={t("eyebrow.vocabulary")}
        title={t("topicSelect.title")}
        subtitle={t("topicSelect.subtitle")}
      />
      <div className="choice-grid">
        {topics.map((topic) => {
          const stats = topicStats(topic.key);
          return (
            <button key={topic.key} type="button" className="choice" onClick={() => onSelect(topic.key)}>
              <ArrowRightOutlined className="choice-arrow" />
              <span className="choice-title">{topic.title}</span>
              <span className="choice-sub">{topic.subtitle}</span>
              <span className="choice-meta">
                {t("topicSelect.meta", { levels: stats.levels, words: nf.format(stats.words) })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
