import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { LearningTrack } from "../utils/learningTrack";
import { TRACKS } from "./AppHeader";
import PageHeader from "./PageHeader";

interface TrackSelectProps {
  onSelect: (track: LearningTrack) => void;
}

export default function TrackSelect({ onSelect }: TrackSelectProps) {
  const { t } = useTranslation();
  return (
    <div className="page page-wide" style={{ paddingTop: "clamp(40px, 10vh, 112px)" }}>
      <PageHeader
        eyebrow={t("eyebrow.welcome")}
        title={t("trackSelect.title")}
        subtitle={t("trackSelect.subtitle")}
      />
      <div className="choice-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {TRACKS.map((track) => (
          <button
            key={track.key}
            type="button"
            className="choice"
            style={{ minHeight: 240, padding: 24 }}
            onClick={() => onSelect(track.key)}
          >
            <span className="choice-glyph" lang={track.lang}>
              {track.glyph}
            </span>
            <span className="choice-title">{t(track.titleKey)}</span>
            <span className="choice-sub">{t(`trackSelect.${track.key}Subtitle`)}</span>
            <span className="choice-meta" style={{ color: "var(--ink)", fontWeight: 500 }}>
              {t("trackSelect.start")} <ArrowRightOutlined style={{ fontSize: 12 }} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
