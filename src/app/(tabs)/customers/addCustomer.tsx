import { CustomButton } from "@/components/button/CustomButton";
import { CustomTextArea } from "@/components/input/CustomTextArea";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddCustomerScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { theme } = useAppTheme();

  const handleSaveCustomer = () => {
    const customerData = { name, phone, address, notes };
    console.log("Customer Saved:", customerData);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FeedHeader title="Add Customers" />

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
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="03XX-XXXXXXX"
          keyboardType="phone-pad"
          required
        />

        <CustomTextInput
          label="Address (Optional)"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter city or local address"
        />

        <CustomTextArea
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Special preferences, collar types, etc."
        />

        {/* Reusable Custom Button Call */}
        <CustomButton
          title="Save Customer"
          iconName="save"
          onPress={handleSaveCustomer}
          buttonStyle={styles.saveButtonOverride}
        />
      </ScrollView>
    </View>
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
});
