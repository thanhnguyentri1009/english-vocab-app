import { useTranslation } from "react-i18next";
import type { AppLanguage } from "../i18n";

const LANGUAGES: AppLanguage[] = ["vi", "en"];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const active = i18n.language.startsWith("vi") ? "vi" : "en";

  return (
    <div className="lang-toggle" role="group" aria-label="Interface language">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          aria-pressed={active === lang}
          onClick={() => i18n.changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
