import { AuthFooter } from "@/components/button/AuthFooter";
import { CustomButton } from "@/components/button/CustomButton";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import Logo from "@/components/ui/Logo";
import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useLogin } from "@/hooks/useLogin";
import { useAppTheme } from "@/theme";
import { saveToken } from "@/utils/authStorage";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { theme } = useAppTheme();
  const { form, errors, loading, updateField, submit } = useLogin();

  const handleLogin = async () => {
    if (loading) return;

    const success = await submit();
    const dummyToken = "StitchCraft-dummy-token";

    if (success) {
      await saveToken(dummyToken);
      router.replace("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Logo />
      <Image source={Images.backgroundPic} style={styles.pic} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CustomTextInput
          label="Email"
          value={form.email}
          onChangeText={(value) => updateField("email", value)}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          required
          error={errors.email}
        />

        <CustomTextInput
          label="Password"
          value={form.password}
          onChangeText={(value) => updateField("password", value)}
          placeholder="********"
          required
          error={errors.password}
        />

        <CustomButton
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
          buttonStyle={styles.saveButtonOverride}
        />

        <AuthFooter
          title="Don't have an account?"
          buttonTitle="Register"
          onPress={() => router.replace("/(auth)/register")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Metrics.padding.xl,
  },
  saveButtonOverride: {
    marginTop: Metrics.margin.sm,
  },
  pic: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
  },
});
