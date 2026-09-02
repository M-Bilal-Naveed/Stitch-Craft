import { MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    background: "#F8FAFC",
    surface: "#FFFFFF",
    inputBg: "#F1F5F9",
    border: "#E2E8F0",
    primary: "#059669",
    primaryMint: "#10B981",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#94A3B8",
    status: {
      pending: "#D97706",
      inProgress: "#2563EB",
      stitching: "#7C3AED",
      completed: "#059669",
    },
  },
};
