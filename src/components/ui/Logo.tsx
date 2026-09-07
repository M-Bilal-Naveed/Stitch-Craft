import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Image, StyleSheet, View } from "react-native";
import Typography from "../text/typography";

const Logo = () => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.image} />
      <Typography variant="h2" color={theme.colors.textPrimary}>
        Stitch Craft
      </Typography>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.margin.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Metrics.width.logo,
    height: Metrics.height.logo,
  },
});
