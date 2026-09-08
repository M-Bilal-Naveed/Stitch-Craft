import { SearchInput } from "@/components/input/SearchInput";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

export interface Customer {
  id: string;
  name: string;
}

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

  const filteredCustomers = customers.filter((item) =>
    `${item.name}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            placeholder="Search customer name or ID..."
          />

          <FlatList
            data={filteredCustomers}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.customerItem,
                  { borderBottomColor: theme.colors.textSecondary },
                ]}
                onPress={() => handleSelect(item)}
              >
                <Typography variant="body1" color={theme.colors.textPrimary}>
                  {item.name}
                </Typography>
              </TouchableOpacity>
            )}
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
});
