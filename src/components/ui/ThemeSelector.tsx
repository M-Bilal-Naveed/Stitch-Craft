import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";
import Typography from "../text/typography";

export default function ThemeSelector() {
  const theme = useTheme();

  const { themeMode, setThemeMode } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography variant="body1" color={theme.colors.onSurface}>
        Appearance
      </Typography>

      <Typography variant="caption" color={theme.colors.onSurfaceVariant}>
        Choose how the app should look
      </Typography>

      <SegmentedButtons
        value={themeMode}
        onValueChange={(value) =>
          setThemeMode(value as "system" | "light" | "dark")
        }
        buttons={[
          {
            value: "system",
            label: "System",
            icon: "theme-light-dark",
          },
          {
            value: "light",
            label: "Light",
            icon: "white-balance-sunny",
          },
          {
            value: "dark",
            label: "Dark",
            icon: "moon-waning-crescent",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Metrics.gap.sm,
  },
});
