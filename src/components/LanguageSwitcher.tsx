import { useTranslation } from "react-i18next";
import type { AppLanguage } from "../i18n";

const LANGUAGES: AppLanguage[] = ["en", "vi"];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const active = i18n.language.startsWith("vi") ? "vi" : "en";

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 50,
        display: "flex",
        gap: 2,
        background: "#fff",
        borderRadius: 999,
        padding: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          style={{
            border: "none",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            background: active === lang ? "#7aa7d9" : "transparent",
            color: active === lang ? "#fff" : "#8a97a3",
            transition: "all 0.15s",
          }}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
