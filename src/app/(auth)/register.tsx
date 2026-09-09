import { AuthFooter } from "@/components/button/AuthFooter";
import { CustomButton } from "@/components/button/CustomButton";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import Logo from "@/components/ui/Logo";
import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useRegister } from "@/hooks/useRegister";
import { useAppTheme } from "@/theme";
import { saveToken } from "@/utils/authStorage";
import { router } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const { theme } = useAppTheme();

  const { form, errors, loading, updateField, submit } = useRegister();

  const handleRegister = async () => {
    const success = await submit();
    const dummyToken = "StitchCraft-dummy-token";

    if (success) {
      await saveToken(dummyToken);
      router.replace("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Logo />

      <Image source={Images.backgroundPic} style={styles.pic} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CustomTextInput
            label="Full Name"
            value={form.name}
            onChangeText={(value) => updateField("name", value)}
            placeholder="Enter full name"
            required
            error={errors.name}
          />

          <CustomTextInput
            label="Shop Name"
            value={form.shopName}
            onChangeText={(value) => updateField("shopName", value)}
            placeholder="Enter Shop Name"
            required
            error={errors.shopName}
          />

          <CustomTextInput
            label="Enter Your Email"
            value={form.email}
            onChangeText={(value) => updateField("email", value)}
            placeholder="Enter Your Email address"
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
            title={loading ? "Creating Account..." : "Register"}
            onPress={handleRegister}
            buttonStyle={styles.saveButtonOverride}
          />

          <AuthFooter
            title="Already have an account?"
            buttonTitle="Login"
            onPress={() => router.replace("/(auth)/login")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
