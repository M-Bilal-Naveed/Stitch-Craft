import AddButton from "@/components/button/AddButton";
import { Customer, CustomerCard } from "@/components/customer/CustomerCard";
import CustomersHeader from "@/components/customer/CustomersHeader";
import { SearchInput } from "@/components/input/SearchInput";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "1", name: "Ahmed Khan", phone: "0300-1234567" },
  { id: "2", name: "Ali Raza", phone: "0313-7654321" },
  { id: "3", name: "Usman Malik", phone: "0321-9876543" },
];

export default function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);

  const { theme } = useAppTheme();

  // Filter customers by Name or Phone Number
  const filteredCustomers = customers.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    // item.phone.includes(searchQuery)
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomersHeader />

      <View style={styles.content}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Customer by Name"
        />

        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomerCard
              customer={item}
              onPress={(selected) => console.log("Selected:", selected.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Typography variant="h4" style={styles.emptyText}>
              No customers found.
            </Typography>
          }
        />
      </View>
      <AddButton
        onPress={() => router.navigate("/(tabs)/customers/addCustomer")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Metrics.padding.lg,
    paddingBottom: Metrics.padding.xl,
  },
  emptyText: {
    textAlign: "center",
    marginTop: Metrics.margin.xxxl,
  },
});
