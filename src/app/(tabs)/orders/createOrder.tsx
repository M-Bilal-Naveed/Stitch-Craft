import { CustomButton } from "@/components/button/CustomButton";
import { CustomDropdown } from "@/components/input/CustomDropdown";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import { DatePickerInput } from "@/components/input/DatepickerInput";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function CreateOrderScreen() {
  // Form State Management
  const [customer, setCustomer] = useState("Ahmed Khan");
  const [clothingType, setClothingType] = useState("Shalwar Kameez");
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");

  // Dynamic calculations for remaining payment
  const total = parseFloat(totalPrice) || 0;
  const advance = parseFloat(advancePayment) || 0;
  const remaining = Math.max(0, total - advance);
  const { theme } = useAppTheme();

  // Dropdown options lists
  const customerOptions = ["Ahmed Khan", "Muhammad Ali", "Usman Raza"];

  const clothingOptions = ["Shalwar Kameez", "Suit", "Pant Shirt", "Waistcoat"];

  const handleCreateOrder = () => {
    const orderData = {
      customer,
      clothingType,
      deliveryDate,
      totalPrice: total,
      advancePayment: advance,
      remainingPayment: remaining,
    };
    console.log("Order Created Successfully:", orderData);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Feed Header */}
      <FeedHeader title="Create Order" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Select Dropdown */}
        <CustomDropdown
          label="Select Customer"
          value={customer}
          options={customerOptions}
          onSelect={setCustomer}
          required
        />

        {/* Select Dropdown */}
        <CustomDropdown
          label="Clothing Type"
          value={clothingType}
          options={clothingOptions}
          onSelect={setClothingType}
          required
        />

        {/* Date Picker Input */}
        <DatePickerInput
          label="Delivery Date"
          value={deliveryDate}
          onChange={setDeliveryDate}
          required
        />

        {/* Total Price Input */}
        <CustomTextInput
          label="Total Price (Rs)"
          value={totalPrice}
          onChangeText={setTotalPrice}
          placeholder="0"
          keyboardType="numeric"
        />

        {/* Advance Payment Input */}
        <CustomTextInput
          label="Advance Payment (Rs)"
          value={advancePayment}
          onChangeText={setAdvancePayment}
          placeholder="0"
          keyboardType="numeric"
        />

        {/* Dynamic Remaining Payment Calculation Bar */}
        <View
          style={[
            styles.remainingBox,
            { borderBottomColor: theme.colors.textSecondary },
          ]}
        >
          <Typography variant="body1" color={theme.colors.primary}>
            Remaining Payment: Rs. {remaining.toLocaleString()}
          </Typography>
        </View>

        {/* Reusable Create Order Button */}
        <CustomButton
          title="Create Order"
          iconName="check"
          onPress={handleCreateOrder}
          buttonStyle={styles.createButton}
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
    paddingBottom: Metrics.padding.xxxl,
  },
  remainingBox: {
    paddingVertical: Metrics.padding.md,
    borderBottomWidth: 1,
    marginBottom: Metrics.margin.xxl,
  },
  createButton: {
    borderRadius: Metrics.radius.xl,
  },
});
