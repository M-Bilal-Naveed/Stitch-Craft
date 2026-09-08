import { CustomButton } from "@/components/button/CustomButton";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { CustomDropdown } from "@/components/input/CustomDropdown";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import { DatePickerInput } from "@/components/input/DatepickerInput";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const CUSTOMERS_LIST = [
  { id: "1", name: "Ahmed Khan" },
  { id: "2", name: "Muhammad Ali" },
  { id: "3", name: "Usman Raza" },
  { id: "4", name: "Hamza Malik" },
  { id: "5", name: "Bilal Ahmad" },
];

export default function CreateOrderScreen() {
  const { theme } = useAppTheme();

  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [clothingType, setClothingType] = useState("Shalwar Kameez");
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");

  const total = parseFloat(totalPrice) || 0;
  const advance = parseFloat(advancePayment) || 0;
  const remaining = Math.max(0, total - advance);

  const clothingOptions = ["Shalwar Kameez", "Suit", "Pant Shirt", "Waistcoat"];

  const handleCreateOrder = () => {
    const orderData = {
      customer: selectedCustomer,
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
      <FeedHeader title="Create Order" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer Select Field (Tapping opens Modal) */}
        <TouchableOpacity
          onPress={() => setIsSearchModalOpen(true)}
          activeOpacity={0.8}
        >
          <View pointerEvents="none">
            <CustomTextInput
              label="Select Customer *"
              value={selectedCustomer}
              onChangeText={() => {}}
              placeholder="Tap to search customer..."
            />
          </View>
        </TouchableOpacity>

        {/* Clothing Type Dropdown */}
        <CustomDropdown
          label="Clothing Type"
          value={clothingType}
          options={clothingOptions}
          onSelect={setClothingType}
          required
        />

        {/* Delivery Date Picker */}
        <DatePickerInput
          label="Delivery Date"
          value={deliveryDate}
          onChange={setDeliveryDate}
          required
        />

        {/* Price Inputs */}
        <CustomTextInput
          label="Total Price (Rs)"
          value={totalPrice}
          onChangeText={setTotalPrice}
          placeholder="0"
          keyboardType="numeric"
        />

        <CustomTextInput
          label="Advance Payment (Rs)"
          value={advancePayment}
          onChangeText={setAdvancePayment}
          placeholder="0"
          keyboardType="numeric"
        />

        {/* Remaining Payment Summary Bar */}
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

        {/* Create Order Button */}
        <CustomButton
          title="Create Order"
          iconName="check"
          onPress={handleCreateOrder}
          buttonStyle={styles.createButton}
        />
      </ScrollView>

      {/* Reusable Customer Search Modal Component */}
      <CustomerSearchModal
        visible={isSearchModalOpen}
        customers={CUSTOMERS_LIST}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCustomer={(customer) => setSelectedCustomer(`${customer.name}`)}
      />
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
