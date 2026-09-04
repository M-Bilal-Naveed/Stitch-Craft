import AppInfoCard from "@/components/settings/AppInfoCard";
import SettingsHeader from "@/components/settings/SettingsHeader";
import ShopBanner from "@/components/settings/ShopBanner";
import ThemeSelector from "@/components/ui/ThemeSelector";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <SettingsHeader />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Metrics.padding.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ShopBanner />

        <ThemeSelector />

        <AppInfoCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Metrics.padding.lg,
  },
});
