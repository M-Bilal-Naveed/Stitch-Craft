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
    settingCard: string;
    settingBoarder: string;

    containerBackground: string;
    activeIcon: string;
    inactiveIcon: string;

    accent: {
      Stitching: string;
      Cutting: string;
      Pending: string;
      Ready: string;
      Delivered: string;
    };

    accentText: {
      Stitching: string;
      Cutting: string;
      Pending: string;
      Ready: string;
      Delivered: string;
    };

    bg: {
      Stitching: string;
      Cutting: string;
      Pending: string;
      Ready: string;
      Delivered: string;
    };
  };
};
