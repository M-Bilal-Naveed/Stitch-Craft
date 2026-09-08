import { MD3LightTheme } from "react-native-paper";

import type { AppTheme } from "./theme.types";

export const lightTheme: AppTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceVariant: "#EAEFE9",

    inputBg: "#F1F5F9",
    border: "#E2E8F0",

    primary: "#059669",
    primaryMint: "#10B981",
    secondary: "#133020",
    text: "#f7f1f1",
    cGreen: "#2D5A3D",

    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#94A3B8",

    halfWhite: "#F3F7F3",
    settingCard: "#F3F7F3",
    settingBoarder: "#2D5A3D",

    containerBackground: "#1D3F33",
    activeIcon: "#88DDB1",
    inactiveIcon: "#FFFFFF",

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
