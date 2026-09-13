import { useTranslation } from "react-i18next";
import type { LearningTrack } from "../utils/learningTrack";

interface TrackSwitcherProps {
  track: LearningTrack;
  onSwitch: () => void;
}

export default function TrackSwitcher({ track, onSwitch }: TrackSwitcherProps) {
  const { t } = useTranslation();
  return (
    <button
      onClick={onSwitch}
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 50,
        border: "none",
        borderRadius: 999,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "inherit",
        cursor: "pointer",
        background: "#fff",
        color: "#8a97a3",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span>{track === "japanese" ? "🇯🇵" : "🇬🇧"}</span>
      <span>{t("trackSelect.switchTrack")}</span>
    </button>
  );
}
