import { CheckOutlined, DownOutlined, SwapOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { LearningTrack } from "../utils/learningTrack";
import LanguageSwitcher from "./LanguageSwitcher";

export const TRACKS: { key: LearningTrack; glyph: string; lang: string; titleKey: string; home: string }[] = [
  { key: "english", glyph: "Aa", lang: "en", titleKey: "trackSelect.englishTitle", home: "/" },
  { key: "japanese", glyph: "あ", lang: "ja", titleKey: "trackSelect.japaneseTitle", home: "/jp" },
  { key: "chinese", glyph: "中", lang: "zh-CN", titleKey: "trackSelect.chineseTitle", home: "/zh" },
];

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1c1d1f" />
      <path d="M8.5 9h3.6l3.9 10.6L19.9 9h3.6l-5.8 14h-3.4z" fill="#f6f5f1" />
      <circle cx="24" cy="23" r="2" fill="#c85a26" />
    </svg>
  );
}

interface AppHeaderProps {
  track: LearningTrack | null;
  onChangeTrack: (track: LearningTrack) => void;
  account: { name: string; onSwitch: () => void } | null;
}

export default function AppHeader({ track, onChangeTrack, account }: AppHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const current = TRACKS.find((tr) => tr.key === track);

  const trackMenu: MenuProps = {
    selectable: false,
    items: TRACKS.map((tr) => ({
      key: tr.key,
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 180 }}>
          <span className="track-glyph" lang={tr.lang}>
            {tr.glyph}
          </span>
          <span style={{ flex: 1 }}>{t(tr.titleKey)}</span>
          {tr.key === track && <CheckOutlined style={{ fontSize: 12 }} />}
        </span>
      ),
    })),
    onClick: ({ key }) => {
      const next = TRACKS.find((tr) => tr.key === key);
      if (!next || next.key === track) return;
      onChangeTrack(next.key);
      navigate(next.home);
    },
  };

  const accountMenu: MenuProps | null = account && {
    items: [
      {
        key: "info",
        disabled: true,
        style: { cursor: "default" },
        label: (
          <div className="menu-account">
            <small>{t("common.signedInAs")}</small>
            <strong>{account.name}</strong>
          </div>
        ),
      },
      { type: "divider" },
      { key: "switch", icon: <SwapOutlined />, label: t("header.switchAccount") },
    ],
    onClick: ({ key }) => {
      if (key === "switch") account.onSwitch();
    },
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <button
          type="button"
          className="brand"
          onClick={() => current && navigate(current.home)}
          aria-label="Vocab"
        >
          <BrandMark className="brand-mark" />
          <span className="brand-name">Vocab</span>
        </button>

        {current && (
          <>
            <span className="header-divider" />
            <Dropdown menu={trackMenu} trigger={["click"]} placement="bottomLeft">
              <button type="button" className="header-pill" aria-label={t("header.chooseLanguage")}>
                <span className="track-glyph" lang={current.lang}>
                  {current.glyph}
                </span>
                <span className="track-name">{t(current.titleKey)}</span>
                <DownOutlined className="chev" />
              </button>
            </Dropdown>
          </>
        )}

        <span className="header-spacer" />

        <LanguageSwitcher />

        {account && accountMenu && (
          <Dropdown menu={accountMenu} trigger={["click"]} placement="bottomRight">
            <button type="button" className="header-pill" aria-label={t("common.signedInAs")}>
              <span className="avatar">{account.name.trim().charAt(0) || "?"}</span>
              <span className="account-name">{account.name}</span>
              <DownOutlined className="chev" />
            </button>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
