import { MD3DarkTheme } from "react-native-paper";

import type { AppTheme } from "./theme.types";

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    background: "#0F172A",
    surface: "#1E293B",

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

    containerBackground: "#121E1A",
    activeIcon: "#A2EAC7",
    inactiveIcon: "#8F9D97",

    status: {
      pending: "#F59E0B",
      inProgress: "#3B82F6",
      stitching: "#8B5CF6",
      completed: "#10B981",
    },
  },
};
