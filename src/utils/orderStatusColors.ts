import { AppTheme } from "@/theme/theme.types"; // adjust this type to your actual theme type
import { OrderStatus } from "@/types/orderStatus";

export const getStatusColors = (status: OrderStatus, theme: AppTheme) => {
  switch (status) {
    case "Stitching":
      return {
        accent: theme.colors.accent.Stitching,
        text: theme.colors.accentText.Stitching,
        bg: theme.colors.bg.Stitching,
      };

    case "Cutting":
      return {
        accent: theme.colors.accent.Cutting,
        text: theme.colors.accentText.Cutting,
        bg: theme.colors.bg.Cutting,
      };

    case "Pending":
      return {
        accent: theme.colors.accent.Pending,
        text: theme.colors.accentText.Pending,
        bg: theme.colors.bg.Pending,
      };

    case "Ready":
      return {
        accent: theme.colors.accent.Ready,
        text: theme.colors.accentText.Ready,
        bg: theme.colors.bg.Ready,
      };

    case "Delivered":
      return {
        accent: theme.colors.accent.Delivered,
        text: theme.colors.accentText.Delivered,
        bg: theme.colors.bg.Delivered,
      };
  }
};
