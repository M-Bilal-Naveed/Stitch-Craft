import { CustomButton } from "@/components/button/CustomButton";
import { CustomerBanner } from "@/components/customer/CustomerBanner";
import { CustomTextArea } from "@/components/input/CustomTextArea";
import { MeasurementInput } from "@/components/input/MeasurementInput";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useCustomers } from "@/hooks/useCustomer";
import { useAppTheme } from "@/theme";
import {
  MeasurementFields,
  MeasurementKey,
  MeasurementPayload,
} from "@/types/measurement";
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

const INITIAL_MEASUREMENTS: MeasurementFields = {
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
};

const MEASUREMENT_CONFIG: { key: MeasurementKey; label: string }[] = [
  { key: "kameez_length", label: "Shirt / Kameez Length" },
  { key: "chest", label: "Chest" },
  { key: "waist", label: "Waist" },
  { key: "shoulder", label: "Shoulder" },
  { key: "sleeve_length", label: "Sleeve Length" },
  { key: "trouser_length", label: "Trouser Length" },
  { key: "collar", label: "Collar Size" },
  { key: "bicep", label: "Bicep" },
  { key: "armhole", label: "Armhole" },
  { key: "cuff", label: "Cuff" },
  { key: "hip", label: "Hip" },
  { key: "pancha", label: "Bottom / Pancha" },
];

export default function MeasurementsScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { customerId } = useLocalSearchParams<{ customerId: string }>();

  const {
    getCustomerWithMeasurements,
    saveCustomerMeasurements,
    measurementErrors,
    clearMeasurementFieldError,
  } = useCustomers();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const [measurements, setMeasurements] =
    useState<MeasurementFields>(INITIAL_MEASUREMENTS);
  const [initialMeasurements, setInitialMeasurements] =
    useState<MeasurementFields>(INITIAL_MEASUREMENTS);

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [initialInstructions, setInitialInstructions] = useState("");

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
          const loadedMeasurements: MeasurementFields = {
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
          };

          setMeasurements(loadedMeasurements);
          setInitialMeasurements(loadedMeasurements);

          const notes = m.notes ?? "";
          setSpecialInstructions(notes);
          setInitialInstructions(notes);
        }
      }
      setLoading(false);
    }

    loadData();
  }, [customerId, getCustomerWithMeasurements]);

  const updateMeasurement = (key: MeasurementKey, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
    clearMeasurementFieldError(key);
  };

  const isFormUnchanged =
    JSON.stringify(measurements) === JSON.stringify(initialMeasurements) &&
    specialInstructions === initialInstructions;

  const isSaveDisabled = saving || isFormUnchanged;

  const handleSaveMeasurements = async () => {
    if (!customerId) return;

    setSaving(true);
    const numericId = Number(customerId);

    const payload: MeasurementPayload = {
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

    const success = await saveCustomerMeasurements(
      numericId,
      payload,
      measurements,
    );

    setSaving(false);

    if (!success) return;

    Alert.alert("Success", "Measurements updated successfully.", [
      { text: "OK", onPress: () => router.back() },
    ]);
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
        style={styles.flexOne}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <CustomerBanner name={customerName || "Customer"} />

          <View style={styles.gridContainer}>
            {MEASUREMENT_CONFIG.map(({ key, label }) => (
              <MeasurementInput
                key={key}
                label={label}
                value={measurements[key]}
                onChangeText={(text) => updateMeasurement(key, text)}
                hasError={!!measurementErrors[key]}
                errorMessage={measurementErrors[key]}
              />
            ))}
          </View>

          <CustomTextArea
            label="Special Instructions / Notes"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            placeholder="Notes regarding collar style, cuff type, etc."
          />

          <CustomButton
            title={saving ? "Saving..." : "Save Measurements"}
            iconName="edit"
            onPress={handleSaveMeasurements}
            disabled={isSaveDisabled}
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
  flexOne: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
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
