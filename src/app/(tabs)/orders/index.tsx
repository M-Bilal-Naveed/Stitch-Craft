import AddButton from "@/components/button/AddButton";
import { SearchInput } from "@/components/input/SearchInput";
import OrderCard, { Order } from "@/components/orders/OrdersCard";
import OrdersHeader from "@/components/orders/OrdersHeader";
import StatusFilter from "@/components/orders/StatusFilter";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useAppTheme } from "@/theme";
import { FilterCategory } from "@/types/categories.types";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const INITIAL_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "105",
    customerName: "Ahmed Khan",
    clothingType: "Shalwar Kameez",
    deliveryDate: "28 Aug",
    status: "Stitching",
  },
  {
    id: "2",
    orderNumber: "106",
    customerName: "Ali Raza",
    clothingType: "Waistcoat Suit",
    deliveryDate: "30 Aug",
    status: "Cutting",
  },
  {
    id: "3",
    orderNumber: "107",
    customerName: "Usman Malik",
    clothingType: "Pant Shirt",
    deliveryDate: "02 Sep",
    status: "Pending",
  },
  {
    id: "4",
    orderNumber: "108",
    customerName: "Hamza Sheikh",
    clothingType: "Kurta Pajama",
    deliveryDate: "05 Sep",
    status: "Ready",
  },
  {
    id: "6",
    orderNumber: "104",
    customerName: "Ali Raza",
    clothingType: "Pant Kot",
    deliveryDate: "10 Sep",
    status: "Delivered",
  },
];

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<FilterCategory>("All");
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const { theme } = useAppTheme();

  // Filter orders by search text AND status category selection
  const filteredOrders = orders.filter((item) => {
    const matchesSearch = item.customerName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // item.orderNumber.includes(searchQuery);

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <OrdersHeader />

      <View style={styles.content}>
        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Order by Customer or ID"
        />

        {/* Status Filter Horizontal Pills */}
        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
        />

        {/* Orders FlatList */}
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={(selected) =>
                console.log("Selected Order:", selected.orderNumber)
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Typography variant="h4" style={styles.emptyText}>
              No orders found.
            </Typography>
          }
        />
      </View>

      <AddButton />
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
