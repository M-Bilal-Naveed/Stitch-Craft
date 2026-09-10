import { CustomButton } from "@/components/button/CustomButton";
import { CustomTextArea } from "@/components/input/CustomTextArea";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useCustomers } from "@/hooks/useCustomer";
import { useAppTheme } from "@/theme";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AddCustomerScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { theme } = useAppTheme();
  const { addCustomer, loading, errors, clearFieldError } = useCustomers();

  const handleNameChange = (value: string) => {
    setName(value);
    clearFieldError("name");
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    clearFieldError("phone");
  };

  const handleSaveCustomer = async () => {
    if (loading) return;

    const success = await addCustomer({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    if (success) {
      router.back();
    }
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
        <CustomTextInput
          label="Customer Name"
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter full name"
          required
          error={errors.name}
        />

        <CustomTextInput
          label="Phone Number"
          value={phone}
          onChangeText={handlePhoneChange}
          placeholder="03XX-XXXXXXX"
          keyboardType="phone-pad"
          required
          error={errors.phone}
        />

        <CustomTextInput
          label="Address (Optional)"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter city or local address"
          error={errors.address}
        />

        <CustomTextArea
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Special preferences, collar types, etc."
        />

        <CustomButton
          title={loading ? "Saving Customer..." : "Save Customer"}
          iconName="save"
          onPress={handleSaveCustomer}
          loading={loading}
          buttonStyle={styles.saveButtonOverride}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Metrics.padding.xl },
  saveButtonOverride: { marginTop: Metrics.margin.sm },
});
