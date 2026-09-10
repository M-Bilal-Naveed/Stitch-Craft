import AddButton from "@/components/button/AddButton";
import { CustomerCard } from "@/components/customer/CustomerCard";
import CustomersHeader from "@/components/customer/CustomersHeader";
import { SearchInput } from "@/components/input/SearchInput";
import Typography from "@/components/text/typography";
import { Metrics } from "@/constants/metrics";
import { useCustomers } from "@/hooks/useCustomer";
import { useAppTheme } from "@/theme";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef("");
  const { theme } = useAppTheme();

  const { customers, loading, loadingMore, fetchCustomers, loadMoreCustomers } =
    useCustomers();

  // Refetch when focused without infinite loops
  useFocusEffect(
    useCallback(() => {
      fetchCustomers(searchRef.current);
    }, [fetchCustomers]),
  );

  const handleSearchChange = (text: string) => {
    const cleanText = text ?? "";
    setSearchQuery(cleanText);
    searchRef.current = cleanText;
    fetchCustomers(cleanText);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CustomersHeader />

      <View style={styles.content}>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Search Customer by Name"
        />

        <FlatList
          data={customers}
          keyExtractor={(item) => String(item.id)}
          refreshing={loading}
          onRefresh={() => fetchCustomers(searchRef.current)}
          onEndReached={() => loadMoreCustomers(searchRef.current)}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <CustomerCard
              customer={{
                id: String(item.id),
                name: item.name,
                phone: item.phone,
              }}
              onPress={(selected) => console.log("Selected:", selected.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                style={styles.footerLoader}
                color={theme.colors.primary}
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
                No customers found.
              </Typography>
            ) : null
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
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: Metrics.padding.lg,
    paddingBottom: Metrics.padding.xl,
  },
  emptyText: {
    textAlign: "center",
    marginTop: Metrics.margin.xxxl,
  },
  footerLoader: {
    marginVertical: Metrics.margin.md,
  },
});
