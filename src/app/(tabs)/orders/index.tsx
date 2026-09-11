import AddButton from "@/components/button/AddButton";
import { SearchInput } from "@/components/input/SearchInput";
import OrderCard from "@/components/orders/OrdersCard";
import OrdersHeader from "@/components/orders/OrdersHeader";
import StatusFilter from "@/components/orders/StatusFilter";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useOrders } from "@/hooks/useOrder";
import { useAppTheme } from "@/theme";
import { FilterCategory } from "@/types/categories.types";
import { Order as DBOrder } from "@/types/order";
import { OrderStatus } from "@/types/orderStatus";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

export default function OrdersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<FilterCategory>("All");

  const { theme } = useAppTheme();
  const {
    orders,
    loading,
    loadingMore,
    hasMore,
    fetchOrders,
    loadMoreOrders,
    changeOrderStatus,
  } = useOrders();

  // Refetch when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchOrders(searchQuery, selectedStatus as OrderStatus | "All");
    }, [fetchOrders, searchQuery, selectedStatus]),
  );

  // Trigger search/filter changes
  useEffect(() => {
    fetchOrders(searchQuery, selectedStatus as OrderStatus | "All");
  }, [searchQuery, selectedStatus, fetchOrders]);

  const handleRefresh = () => {
    fetchOrders(searchQuery, selectedStatus as OrderStatus | "All");
  };

  const handleEndReached = () => {
    if (hasMore && !loadingMore && !loading) {
      loadMoreOrders(searchQuery, selectedStatus as OrderStatus | "All");
    }
  };

  // Transform DB Order model to match OrderCard props expectations
  const formatOrderForCard = (dbOrder: DBOrder) => {
    return {
      id: String(dbOrder.id),
      orderNumber: String(dbOrder.id),
      customerName: dbOrder.customer_name || "Unknown Customer",
      clothingType: dbOrder.cloth_type,
      deliveryDate: dbOrder.delivery_date,
      status: dbOrder.status,
    };
  };

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
          placeholder="Search Order by Customer Name"
        />

        {/* Status Filter Horizontal Pills */}
        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={(status) => setSelectedStatus(status)}
        />

        {/* Orders FlatList */}
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OrderCard
              order={formatOrderForCard(item)}
              onPress={(selected) =>
                router.push({
                  pathname: "/(tabs)/orders/orderDetail",
                  params: { id: selected.id },
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.primary}
                style={styles.loader}
              />
            ) : null
          }
          ListEmptyComponent={
            !loading ? (
              <Typography
                variant="h4"
                style={styles.emptyText}
                color={theme.colors.textPrimary}
              >
                No orders found.
              </Typography>
            ) : null
          }
        />
      </View>

      <AddButton
        onPress={() => router.navigate("/(tabs)/orders/createOrder")}
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
  loader: {
    marginVertical: Metrics.margin.md,
  },
});
