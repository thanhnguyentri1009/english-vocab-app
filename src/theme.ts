import { theme, type ThemeConfig } from 'antd'

// Single source of truth for colors used from TypeScript. Keep in sync with
// the CSS variables in index.css.
export const COLORS = {
  ink: '#1c1d1f',
  ink2: '#3d4046',
  muted: '#5f636b',
  subtle: '#8b8f96',
  line: '#e4e2dc',
  lineStrong: '#cfccc4',
  bg: '#f6f5f1',
  surface: '#ffffff',
  accent: '#2c4d86',
  accentSoft: '#eaeff7',
  highlight: '#c85a26',
  success: '#1f7a46',
  successSoft: '#e9f4ec',
  danger: '#b8352b',
  dangerSoft: '#f9ebe9',
  warning: '#946200',
  warningSoft: '#f8f1e1',
} as const

export const FONT_SANS =
  "'Be Vietnam Pro', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', sans-serif"
export const FONT_SERIF =
  "Newsreader, 'Noto Serif JP', 'Noto Serif SC', Georgia, 'Times New Roman', serif"

export const appTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: COLORS.accent,
    colorInfo: COLORS.accent,
    colorSuccess: COLORS.success,
    colorError: COLORS.danger,
    colorWarning: COLORS.warning,
    colorText: COLORS.ink,
    colorTextSecondary: COLORS.muted,
    colorTextTertiary: COLORS.subtle,
    colorBorder: COLORS.lineStrong,
    colorBorderSecondary: COLORS.line,
    colorBgLayout: COLORS.bg,
    fontFamily: FONT_SANS,
    fontSize: 15,
    borderRadius: 10,
    borderRadiusLG: 14,
    borderRadiusSM: 6,
    controlHeight: 38,
    controlHeightLG: 46,
    boxShadow: 'none',
    boxShadowSecondary: '0 12px 32px -8px rgba(28, 29, 31, 0.18), 0 2px 6px rgba(28, 29, 31, 0.06)',
    motionDurationMid: '0.16s',
  },
  components: {
    Card: { boxShadowTertiary: 'none' },
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow: 'none',
      fontWeight: 500,
      paddingInlineLG: 22,
    },
    Progress: { remainingColor: COLORS.line },
    Segmented: { trackBg: '#ebe9e3', itemSelectedBg: COLORS.surface, trackPadding: 3 },
    Typography: { titleMarginBottom: 0, titleMarginTop: 0 },
    Dropdown: { paddingBlock: 8 },
    Modal: { borderRadiusLG: 16 },
  },
}
