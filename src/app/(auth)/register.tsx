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

export default function register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");

  const { theme } = useAppTheme();

  const handleRegister = () => {
    const customerData = { name, password, email, shopName };
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
        {/* Form Inputs */}
        <CustomTextInput
          label="Customer Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
          required
        />

        <CustomTextInput
          label="Shop Name"
          value={shopName}
          onChangeText={setShopName}
          placeholder="Enter Shop Name"
          required
        />

        <CustomTextInput
          label="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Your Email address"
          keyboardType="email-address"
        />

        <CustomTextInput
          label="Address (Optional)"
          value={password}
          onChangeText={setPassword}
          placeholder="********"
        />

        {/* Reusable Custom Button Call */}
        <CustomButton
          title="Register"
          onPress={handleRegister}
          buttonStyle={styles.saveButtonOverride}
        />

        <AuthFooter
          title="Already have have an account?"
          buttonTitle="Login"
          onPress={() => router.replace("/(auth)/login")}
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
