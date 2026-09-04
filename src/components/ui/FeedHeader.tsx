import { useAppTheme } from "@/theme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Typography from "../text/typography";

interface FeedHeaderProps {
  title: string;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({ title }) => {
  const { theme } = useAppTheme();
  return (
    <Appbar.Header
      style={[styles.header, { backgroundColor: theme.colors.secondary }]}
    >
      <Appbar.BackAction
        color={theme.colors.text}
        onPress={() => router.back()}
      />
      <Appbar.Content
        title={
          <Typography variant="h3" color={theme.colors.text}>
            {title}
          </Typography>
        }
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
});
