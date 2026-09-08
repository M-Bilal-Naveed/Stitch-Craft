import { CustomButton } from "@/components/button/CustomButton";
import { CustomerBanner } from "@/components/customer/CustomerBanner";
import { CustomTextArea } from "@/components/input/CustomTextArea";
import { MeasurementInput } from "@/components/input/MeasurementInput";
import { FeedHeader } from "@/components/ui/FeedHeader";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

export default function MeasurementsScreen() {
  const { theme } = useAppTheme();

  // Full Tailoring Measurements State
  const [measurements, setMeasurements] = useState({
    kameezLength: "40",
    chest: "20",
    waist: "18",
    shoulder: "17",
    sleeveLength: "24",
    trouserLength: "40",
    collar: "15.5",
    bicep: "14",
    armhole: "18",
    cuff: "9.5",
    hip: "22",
    pancha: "16",
  });

  const [specialInstructions, setSpecialInstructions] = useState("");

  const updateMeasurement = (key: keyof typeof measurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveMeasurements = () => {
    const data = {
      measurements,
      specialInstructions,
    };
    console.log("Updated Measurements Saved:", data);
  };

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
          <CustomerBanner name="Ahmed Khan" />

          {/* 2-Column Grid Layout for Measurements */}
          <View style={styles.gridContainer}>
            <MeasurementInput
              label="Shirt / Kameez Length"
              value={measurements.kameezLength}
              onChangeText={(text) => updateMeasurement("kameezLength", text)}
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
              value={measurements.sleeveLength}
              onChangeText={(text) => updateMeasurement("sleeveLength", text)}
            />
            <MeasurementInput
              label="Trouser Length"
              value={measurements.trouserLength}
              onChangeText={(text) => updateMeasurement("trouserLength", text)}
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
            label="Special Instructions / Collar"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            placeholder="Notes regarding collar style, cuff type, etc."
          />

          {/* Reusable Action Button */}
          <CustomButton
            title="Edit Measurements"
            iconName="edit"
            onPress={handleSaveMeasurements}
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: Metrics.padding.xl,
    paddingBottom: Metrics.padding.xxxl,
  },
  headerEditIcon: {
    paddingRight: Metrics.padding.md,
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
