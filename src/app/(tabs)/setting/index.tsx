import Typography from "@/components/text/typography";
import ThemeSelector from "@/components/ui/ThemeSelector";
import { Metrics } from "@/constants/metrics";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={styles.container}
    >
      <Typography variant="body1" color={theme.colors.onBackground}>
        Settings
      </Typography>

      <ThemeSelector />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Metrics.padding.xl,
    gap: Metrics.gap.xxl,
  },
});
