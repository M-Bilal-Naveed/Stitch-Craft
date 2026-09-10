import { customerRepository } from "@/repositories/customerRepository";
import { Customer, CustomerInput } from "@/types/customer";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useRef, useState } from "react";

const PAGE_SIZE = 10;

type CustomerErrors = {
  name?: string;
  phone?: string;
  address?: string;
};

export function useCustomers() {
  const db = useSQLiteContext();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState<CustomerErrors>({});

  const isFetchingRef = useRef(false);

  // Initial list fetch / Pull to refresh
  const fetchCustomers = useCallback(
    async (searchQuery: unknown = "") => {
      const queryStr = typeof searchQuery === "string" ? searchQuery : "";
      setLoading(true);
      isFetchingRef.current = true;

      try {
        const data = await customerRepository.getPaginatedCustomers(
          db,
          PAGE_SIZE,
          0,
          queryStr,
        );
        const safeData = data ?? [];

        setCustomers(safeData);
        setPage(1);
        setHasMore(safeData.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [db],
  );

  // Load next page on scroll end
  const loadMoreCustomers = useCallback(
    async (searchQuery: unknown = "") => {
      const queryStr = typeof searchQuery === "string" ? searchQuery : "";
      if (isFetchingRef.current || !hasMore) return;

      isFetchingRef.current = true;
      setLoadingMore(true);

      try {
        const offset = Math.max(0, page) * PAGE_SIZE;
        const newBatch = await customerRepository.getPaginatedCustomers(
          db,
          PAGE_SIZE,
          offset,
          queryStr,
        );
        const safeBatch = newBatch ?? [];

        if (safeBatch.length < PAGE_SIZE) {
          setHasMore(false);
        }

        if (safeBatch.length > 0) {
          setCustomers((prev) => [...prev, ...safeBatch]);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Failed to load more customers:", error);
      } finally {
        setLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    [db, page, hasMore],
  );

  // Create a new customer profile
  const addCustomer = useCallback(
    async (input: CustomerInput): Promise<boolean> => {
      const newErrors: CustomerErrors = {};

      if (!input?.name?.trim()) newErrors.name = "Customer name is required.";
      if (!input?.phone?.trim()) newErrors.phone = "Phone number is required.";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return false;
      }

      setLoading(true);
      try {
        await customerRepository.createCustomer(db, input);
        setErrors({});
        return true;
      } catch (error) {
        console.error("Failed to create customer:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [db],
  );

  const clearFieldError = useCallback((field: keyof CustomerErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  return {
    customers,
    loading,
    loadingMore,
    hasMore,
    errors,
    fetchCustomers,
    loadMoreCustomers,
    addCustomer,
    clearFieldError,
  };
}
