import type { MD3Theme } from "react-native-paper";

export type AppTheme = MD3Theme & {
  colors: MD3Theme["colors"] & {
    inputBg: string;
    border: string;

    primaryMint: string;
    cGreen: string;

    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    text: string;

    halfWhite: string;

    containerBackground: string;
    activeIcon: string;
    inactiveIcon: string;

    status: {
      pending: string;
      inProgress: string;
      stitching: string;
      completed: string;
    };
  };
};
