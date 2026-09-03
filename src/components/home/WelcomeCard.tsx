import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { StyleSheet, View } from "react-native";
import Typography from "../text/typography";

const WelcomeCard = () => {
  const { theme } = useAppTheme();
  return (
    <View
      style={[styles.welcomeCard, { backgroundColor: theme.colors.secondary }]}
    >
      <Typography
        variant="caption"
        style={styles.dateText}
        color={theme.colors.textMuted}
      >
        Today • Monday, 24 Aug
      </Typography>
      <Typography variant="h4" color={theme.colors.text}>
        Welcome back, Master!
      </Typography>
    </View>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  welcomeCard: {
    marginVertical: Metrics.margin.lg,
    marginHorizontal: Metrics.margin.md,
    borderRadius: 12,
    padding: Metrics.padding.lg,
  },
  dateText: {
    marginBottom: 4,
  },
});
