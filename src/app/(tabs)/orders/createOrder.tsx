import { CustomButton } from "@/components/button/CustomButton";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { CustomDropdown } from "@/components/input/CustomDropdown";
import { CustomTextArea } from "@/components/input/CustomTextArea";
import { CustomTextInput } from "@/components/input/CustomTextInput";
import { DatePickerInput } from "@/components/input/DatepickerInput";
import Typography from "@/components/text/typography";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useCustomers } from "@/hooks/useCustomer";
import { useOrders } from "@/hooks/useOrder";
import { useAppTheme } from "@/theme";
import { Customer } from "@/types/customer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateOrderScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const { addOrder, loading: isSaving, errors, clearFieldError } = useOrders();
  const { customers, fetchCustomers } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [clothingType, setClothingType] = useState("Shalwar Kameez");
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const total = parseFloat(totalPrice) || 0;
  const advance = parseFloat(advancePayment) || 0;
  const remaining = Math.max(0, total - advance);

  const clothingOptions = ["Shalwar Kameez", "Suit", "Pant Shirt", "Waistcoat"];

  useEffect(() => {
    fetchCustomers("");
  }, [fetchCustomers]);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    clearFieldError("customer_id");
    setIsSearchModalOpen(false);
  };

  const handleCreateOrder = async () => {
    if (!selectedCustomer?.id) {
      Alert.alert("Validation Error", "Please select a customer.");
      return;
    }

    const formattedDate = deliveryDate.toISOString().split("T")[0];

    const success = await addOrder({
      customer_id: selectedCustomer.id,
      cloth_type: clothingType,
      delivery_date: formattedDate,
      total_price: total,
      advance_payment: advance,
      special_request: specialRequest,
      status: "Pending",
    });

    if (success) {
      Alert.alert("Success", "Order created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
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
        {/* Customer Select Field */}
        <TouchableOpacity
          onPress={() => setIsSearchModalOpen(true)}
          activeOpacity={0.8}
        >
          <View pointerEvents="none">
            <CustomTextInput
              label="Select Customer *"
              value={selectedCustomer ? `${selectedCustomer.name}` : ""}
              onChangeText={() => {}}
              placeholder="Tap to search customer..."
              error={errors.customer_id}
            />
          </View>
        </TouchableOpacity>

        {/* Clothing Type Dropdown */}
        <CustomDropdown
          label="Clothing Type"
          value={clothingType}
          options={clothingOptions}
          onSelect={(val) => {
            setClothingType(val);
            clearFieldError("cloth_type");
          }}
          required
        />

        {/* Delivery Date Picker */}
        <DatePickerInput
          label="Delivery Date"
          value={deliveryDate}
          onChange={(date) => {
            setDeliveryDate(date);
            clearFieldError("delivery_date");
          }}
          required
        />

        {/* Price Inputs */}
        <CustomTextInput
          label="Total Price (Rs)"
          value={totalPrice}
          onChangeText={(text) => {
            setTotalPrice(text);
            clearFieldError("total_price");
          }}
          placeholder="0"
          keyboardType="numeric"
          error={errors.total_price}
        />

        <CustomTextInput
          label="Advance Payment (Rs)"
          value={advancePayment}
          onChangeText={(text) => {
            setAdvancePayment(text);
            clearFieldError("advance_payment");
          }}
          placeholder="0"
          keyboardType="numeric"
          error={errors.advance_payment}
        />

        {/* Special Request / Notes */}
        <CustomTextArea
          label="Special Requests / Instructions"
          value={specialRequest}
          onChangeText={setSpecialRequest}
          placeholder="e.g. Double stitch, specific pocket style..."
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
          loading={isSaving}
          buttonStyle={styles.createButton}
        />
      </ScrollView>

      {/* Customer Search Modal */}
      <CustomerSearchModal
        visible={isSearchModalOpen}
        customers={customers}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCustomer={handleSelectCustomer}
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
