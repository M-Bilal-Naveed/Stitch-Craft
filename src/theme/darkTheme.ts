import { MD3DarkTheme } from "react-native-paper";

import type { AppTheme } from "./theme.types";

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    background: "#0F172A",
    surface: "#1E293B",
    surfaceVariant: "#8F9D97",

    inputBg: "#334155",
    border: "#475569",

    primary: "#00D084",
    primaryMint: "#10B981",
    secondary: "#1b5c34a6",
    cGreen: "#2D5A3D",

    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    text: "#f7f1f1",

    halfWhite: "#F3F7F3",
    settingCard: "#1E293B",
    settingBoarder: "#F3F7F3",

    containerBackground: "#121E1A",
    activeIcon: "#A2EAC7",
    inactiveIcon: "#8F9D97",

    error: "#D32F2F",

    accent: {
      Stitching: "#3B82F6",
      Cutting: "#E11D48",
      Pending: "#133020",
      Ready: "#10B981",
      Delivered: "#64748B",
    },

    accentText: {
      Stitching: "#2563EB",
      Cutting: "#E11D48",
      Pending: "#133020",
      Ready: "#059669",
      Delivered: "#475569",
    },

    bg: {
      Stitching: "#DBE8FA",
      Cutting: "#FFE4E6",
      Pending: "#EAEFE9",
      Ready: "#D1FAE5",
      Delivered: "#F1F5F9",
    },
  },
};
