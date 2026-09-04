import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

interface AppInfoCardProps {
  version?: string;
  storageType?: string;
}

const AppInfoCard: React.FC<AppInfoCardProps> = ({
  version = "1.0.0",
  storageType = "Offline (SQLite Local)",
}) => {
  const { theme } = useAppTheme();

  return (
    <Surface
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.settingCard,
          borderColor: theme.colors.settingBoarder,
        },
      ]}
      elevation={0}
    >
      <Typography
        variant="h4"
        color={theme.colors.textPrimary}
        style={styles.cardTitle}
      >
        System Info
      </Typography>

      <View style={styles.infoRow}>
        <Typography variant="body2" color={theme.colors.primary}>
          Storage Mode
        </Typography>
        <Typography variant="body2" color={theme.colors.primary}>
          {storageType}
        </Typography>
      </View>

      <View style={styles.infoRow}>
        <Typography variant="body2" color={theme.colors.primary}>
          Version
        </Typography>
        <Typography variant="body2" color={theme.colors.textPrimary}>
          {version}
        </Typography>
      </View>
    </Surface>
  );
};

export default AppInfoCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: Metrics.radius.xl,
    padding: Metrics.padding.lg,
    marginBottom: Metrics.margin.lg,
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: Metrics.margin.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Metrics.margin.sm,
  },
});
