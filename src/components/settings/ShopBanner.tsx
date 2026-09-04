import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { StyleSheet, View } from "react-native";
import Typography from "../text/typography";

interface ShopBannerProps {
  shopName?: string;
}

const ShopBanner: React.FC<ShopBannerProps> = ({
  shopName = "Tailor Master Shop",
}) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.settingCard,
          borderColor: theme.colors.settingBoarder,
        },
      ]}
    >
      <Typography variant="caption" color={theme.colors.onSurface}>
        Shop Name
      </Typography>

      <Typography
        variant="h4"
        color={theme.colors.onSurfaceVariant}
        numberOfLines={1}
      >
        {shopName}
      </Typography>
    </View>
  );
};

export default ShopBanner;

const styles = StyleSheet.create({
  container: {
    gap: Metrics.gap.sm,
    borderRadius: Metrics.radius.xl,
    padding: Metrics.padding.lg,
    marginBottom: Metrics.margin.lg,
    borderWidth: 1,
  },
});
