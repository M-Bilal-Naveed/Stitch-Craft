import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export type OrderStage =
  | "Pending"
  | "Cutting"
  | "Stitching"
  | "Ready"
  | "Delivered";

interface OrderPipelineProps {
  stages: OrderStage[];
  currentStageIndex: number;
  onSelectStage: (index: number, stage: OrderStage) => void;
}

export const OrderPipeline: React.FC<OrderPipelineProps> = ({
  stages,
  currentStageIndex,
  onSelectStage,
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography
        variant="caption"
        color={theme.colors.textMuted}
        style={styles.sectionTitle}
      >
        ORDER PIPELINE STAGE
      </Typography>

      <View style={styles.pipelineRow}>
        {stages.map((stage, index) => {
          const isPassed = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;

          return (
            <React.Fragment key={stage}>
              {/* Stage Circle Node */}
              <View style={styles.nodeWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onSelectStage(index, stage)}
                  style={[
                    styles.circle,
                    {
                      backgroundColor: isPassed
                        ? theme.colors.cGreen
                        : theme.colors.surfaceVariant,
                      borderColor: isCurrent
                        ? theme.colors.cGreen
                        : "transparent",
                      borderWidth: isCurrent ? 2 : 0,
                    },
                  ]}
                >
                  <Feather
                    name={isPassed ? "check" : "circle"}
                    size={14}
                    color={
                      isPassed ? theme.colors.text : theme.colors.textMuted
                    }
                  />
                </TouchableOpacity>

                <Typography
                  variant="caption"
                  color={
                    isPassed ? theme.colors.textPrimary : theme.colors.textMuted
                  }
                  style={[styles.label, isCurrent && { fontWeight: "700" }]}
                >
                  {stage}
                </Typography>
              </View>

              {/* Connecting Line between nodes */}
              {index < stages.length - 1 && (
                <View
                  style={[
                    styles.connectorLine,
                    {
                      backgroundColor:
                        index < currentStageIndex
                          ? theme.colors.cGreen
                          : theme.colors.surfaceVariant,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.xxl,
  },
  sectionTitle: {
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: Metrics.margin.lg,
  },
  pipelineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nodeWrapper: {
    alignItems: "center",
    zIndex: 1,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: Metrics.margin.xs,
    fontSize: 11,
  },
  connectorLine: {
    flex: 1,
    height: 2,
    marginTop: -16, // Align line with middle of circle
  },
});
