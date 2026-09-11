import { SearchInput } from "@/components/input/SearchInput";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { Customer } from "@/types/customer";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomerSearchModalProps {
  visible: boolean;
  customers: Customer[];
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

export const CustomerSearchModal: React.FC<CustomerSearchModalProps> = ({
  visible,
  customers,
  onClose,
  onSelectCustomer,
}) => {
  const { theme } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((item) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(q);
    const phoneMatch = item.phone
      ? item.phone.toLowerCase().includes(q)
      : false;
    return nameMatch || phoneMatch;
  });

  const handleSelect = (customer: Customer) => {
    onSelectCustomer(customer);
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView
        style={[
          styles.modalContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View style={styles.modalBody}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search customer name or phone..."
          />

          <FlatList
            data={filteredCustomers}
            keyExtractor={(item) => String(item.id ?? Math.random())}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.customerItem,
                  { borderBottomColor: theme.colors.textSecondary },
                ]}
                onPress={() => handleSelect(item)}
              >
                <View>
                  <Typography variant="body1" color={theme.colors.textPrimary}>
                    {item.name}
                  </Typography>
                  {item.phone ? (
                    <Typography
                      variant="caption"
                      color={theme.colors.textMuted}
                    >
                      {item.phone}
                    </Typography>
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Typography variant="body2" style={styles.emptyText}>
                No matching customers found.
              </Typography>
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalBody: {
    flex: 1,
    padding: Metrics.padding.xl,
  },
  customerItem: {
    paddingVertical: Metrics.padding.lg,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: Metrics.margin.xl,
  },
});
