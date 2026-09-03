import { MD3LightTheme } from "react-native-paper";

import type { AppTheme } from "./theme.types";

export const lightTheme: AppTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    background: "#F8FAFC",
    surface: "#FFFFFF",

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

    containerBackground: "#1D3F33",
    activeIcon: "#88DDB1",
    inactiveIcon: "#FFFFFF",

    status: {
      pending: "#D97706",
      inProgress: "#2563EB",
      stitching: "#7C3AED",
      completed: "#059669",
    },
  },
};
