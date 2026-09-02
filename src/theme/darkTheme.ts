import { MD3DarkTheme } from "react-native-paper";

export const darkTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    background: "#0F172A",
    surface: "#1E293B",
    inputBg: "#334155",
    border: "#475569",
    primary: "#00D084",
    primaryMint: "#10B981",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    status: {
      pending: "#F59E0B",
      inProgress: "#3B82F6",
      stitching: "#8B5CF6",
      completed: "#10B981",
    },
  },
};
