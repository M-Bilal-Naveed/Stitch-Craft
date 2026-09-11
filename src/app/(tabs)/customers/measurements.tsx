import { CustomButton } from "@/components/button/CustomButton";
import { CustomerBanner } from "@/components/customer/CustomerBanner";
import { CustomTextArea } from "@/components/input/CustomTextArea";
import { MeasurementInput } from "@/components/input/MeasurementInput";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useCustomers } from "@/hooks/useCustomer";
import { useAppTheme } from "@/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function MeasurementsScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();

  const { getCustomerWithMeasurements, saveCustomerMeasurements } =
    useCustomers();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const [measurements, setMeasurements] = useState({
    kameez_length: "",
    chest: "",
    waist: "",
    shoulder: "",
    sleeve_length: "",
    trouser_length: "",
    collar: "",
    bicep: "",
    armhole: "",
    cuff: "",
    hip: "",
    pancha: "",
  });

  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!customerId) {
        setLoading(false);
        return;
      }

      const numericId = Number(customerId);
      const data = await getCustomerWithMeasurements(numericId);

      if (data) {
        setCustomerName(data.customer.name);
        if (data.measurements) {
          const m = data.measurements;
          setMeasurements({
            kameez_length: m.kameez_length ? String(m.kameez_length) : "",
            chest: m.chest ? String(m.chest) : "",
            waist: m.waist ? String(m.waist) : "",
            shoulder: m.shoulder ? String(m.shoulder) : "",
            sleeve_length: m.sleeve_length ? String(m.sleeve_length) : "",
            trouser_length: m.trouser_length ? String(m.trouser_length) : "",
            collar: m.collar ? String(m.collar) : "",
            bicep: m.bicep ? String(m.bicep) : "",
            armhole: m.armhole ? String(m.armhole) : "",
            cuff: m.cuff ? String(m.cuff) : "",
            hip: m.hip ? String(m.hip) : "",
            pancha: m.pancha ? String(m.pancha) : "",
          });
          setSpecialInstructions(m.notes ?? "");
        }
      }
      setLoading(false);
    }

    loadData();
  }, [customerId, getCustomerWithMeasurements]);

  const updateMeasurement = (key: keyof typeof measurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveMeasurements = async () => {
    if (!customerId) {
      Alert.alert("Error", "No customer ID provided.");
      return;
    }

    setSaving(true);
    const numericId = Number(customerId);

    const payload = {
      kameez_length: measurements.kameez_length
        ? Number(measurements.kameez_length)
        : undefined,
      chest: measurements.chest ? Number(measurements.chest) : undefined,
      waist: measurements.waist ? Number(measurements.waist) : undefined,
      shoulder: measurements.shoulder
        ? Number(measurements.shoulder)
        : undefined,
      sleeve_length: measurements.sleeve_length
        ? Number(measurements.sleeve_length)
        : undefined,
      trouser_length: measurements.trouser_length
        ? Number(measurements.trouser_length)
        : undefined,
      collar: measurements.collar ? Number(measurements.collar) : undefined,
      bicep: measurements.bicep ? Number(measurements.bicep) : undefined,
      armhole: measurements.armhole ? Number(measurements.armhole) : undefined,
      cuff: measurements.cuff ? Number(measurements.cuff) : undefined,
      hip: measurements.hip ? Number(measurements.hip) : undefined,
      pancha: measurements.pancha ? Number(measurements.pancha) : undefined,
      notes: specialInstructions,
    };

    const success = await saveCustomerMeasurements(numericId, payload);
    setSaving(false);

    if (success) {
      Alert.alert("Success", "Measurements updated successfully.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert("Error", "Failed to save measurements. Please try again.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FeedHeader title="Measurements" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Customer Top Banner */}
          <CustomerBanner name={customerName || "Customer"} />

          {/* 2-Column Grid Layout for Measurements */}
          <View style={styles.gridContainer}>
            <MeasurementInput
              label="Shirt / Kameez Length"
              value={measurements.kameez_length}
              onChangeText={(text) => updateMeasurement("kameez_length", text)}
            />
            <MeasurementInput
              label="Chest"
              value={measurements.chest}
              onChangeText={(text) => updateMeasurement("chest", text)}
            />
            <MeasurementInput
              label="Waist"
              value={measurements.waist}
              onChangeText={(text) => updateMeasurement("waist", text)}
            />
            <MeasurementInput
              label="Shoulder"
              value={measurements.shoulder}
              onChangeText={(text) => updateMeasurement("shoulder", text)}
            />
            <MeasurementInput
              label="Sleeve Length"
              value={measurements.sleeve_length}
              onChangeText={(text) => updateMeasurement("sleeve_length", text)}
            />
            <MeasurementInput
              label="Trouser Length"
              value={measurements.trouser_length}
              onChangeText={(text) => updateMeasurement("trouser_length", text)}
            />
            <MeasurementInput
              label="Collar Size"
              value={measurements.collar}
              onChangeText={(text) => updateMeasurement("collar", text)}
            />
            <MeasurementInput
              label="Bicep"
              value={measurements.bicep}
              onChangeText={(text) => updateMeasurement("bicep", text)}
            />
            <MeasurementInput
              label="Armhole"
              value={measurements.armhole}
              onChangeText={(text) => updateMeasurement("armhole", text)}
            />
            <MeasurementInput
              label="Cuff"
              value={measurements.cuff}
              onChangeText={(text) => updateMeasurement("cuff", text)}
            />
            <MeasurementInput
              label="Hip"
              value={measurements.hip}
              onChangeText={(text) => updateMeasurement("hip", text)}
            />
            <MeasurementInput
              label="Bottom / Pancha"
              value={measurements.pancha}
              onChangeText={(text) => updateMeasurement("pancha", text)}
            />
          </View>

          {/* Special Instructions Input */}
          <CustomTextArea
            label="Special Instructions / Notes"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            placeholder="Notes regarding collar style, cuff type, etc."
          />

          {/* Reusable Action Button */}
          <CustomButton
            title={saving ? "Saving..." : "Save Measurements"}
            iconName="edit"
            onPress={handleSaveMeasurements}
            disabled={saving}
            buttonStyle={styles.saveButton}
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: Metrics.padding.xl,
    paddingBottom: Metrics.padding.xxxl,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Metrics.margin.md,
  },
  saveButton: {
    marginTop: Metrics.margin.lg,
    borderRadius: Metrics.radius.xl,
  },
});
