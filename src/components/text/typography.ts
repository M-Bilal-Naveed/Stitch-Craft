import { Fonts } from "@/constants/fonts";
import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { TextProps as PaperTextProps, Text } from "react-native-paper";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "iconText";

// Use a specific type for the generic parameter or use the base type without generic
export interface TypographyProps extends Omit<
  PaperTextProps<never>,
  "variant"
> {
  variant?: TypographyVariant;
  children: React.ReactNode;
  color?: string;
  align?: "auto" | "left" | "right" | "center" | "justify";
  onPress?: () => void;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  children,
  color = "#000000",
  align = "left",
  style,
  onPress,
  ...props
}: TypographyProps): React.ReactNode => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "h3":
        return styles.h3;
      case "h4":
        return styles.h4;
      case "body1":
        return styles.body1;
      case "body2":
        return styles.body2;
      case "caption":
        return styles.caption;
      case "button":
        return styles.button;
      case "iconText":
        return styles.iconText;
      default:
        return styles.body1;
    }
  };

  return React.createElement(Text, {
    style: [getVariantStyle(), { color, textAlign: align }, style],
    onPress,
    ...props,
    children,
  });
};

export default Typography;

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: Fonts.bold,
  },
  h2: {
    fontSize: 28,
    fontFamily: Fonts.bold,
  },
  h3: {
    fontSize: 24,
    fontFamily: Fonts.semiBold,
  },
  h4: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  body1: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  body2: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  caption: {
    fontSize: 12,
    fontFamily: Fonts.regular,

    // opacity: 1,
  },
  button: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  iconText: {
    fontSize: 8,
    fontFamily: Fonts.regular,
  },
});
