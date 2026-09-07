import { AuthFooter } from "@/components/button/AuthFooter";
import { CustomButton } from "@/components/button/CustomButton";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import Logo from "@/components/ui/Logo";
import { Images } from "@/constants/images";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme } = useAppTheme();

  const handleLogin = () => {
    const customerData = { email, password };
    console.log("Customer Saved:", customerData);
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
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          required
        />

        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          required
        />

        <CustomButton
          title="Login"
          onPress={handleLogin}
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
    // paddingBottom: 90,
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
