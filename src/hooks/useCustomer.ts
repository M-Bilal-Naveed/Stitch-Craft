import { customerRepository } from "@/repositories/customerRepository";
import { Customer, CustomerInput, Measurements } from "@/types/customer";
import { MeasurementFields } from "@/types/measurement";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useRef, useState } from "react";

const PAGE_SIZE = 10;

export type CustomerErrors = {
  name?: string;
  phone?: string;
  address?: string;
};

export type MeasurementErrors = {
  [K in keyof MeasurementFields]?: string;
};

export function useCustomers() {
  const db = useSQLiteContext();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // Field error states managed inside the hook
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [measurementErrors, setMeasurementErrors] = useState<MeasurementErrors>(
    {},
  );

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

  // Get single customer details by ID
  const getCustomerById = useCallback(
    async (id: number): Promise<Customer | null> => {
      try {
        return await customerRepository.getCustomerById(db, id);
      } catch (error) {
        console.error("Failed to fetch customer by ID:", error);
        return null;
      }
    },
    [db],
  );

  // Get customer profile together with measurements
  const getCustomerWithMeasurements = useCallback(
    async (
      id: number,
    ): Promise<{
      customer: Customer;
      measurements: Measurements | null;
    } | null> => {
      try {
        return await customerRepository.getCustomerWithMeasurements(db, id);
      } catch (error) {
        console.error("Failed to fetch customer with measurements:", error);
        return null;
      }
    },
    [db],
  );

  // Validate measurement fields on button press
  const validateMeasurements = useCallback(
    (measurements: MeasurementFields): boolean => {
      const newErrors: MeasurementErrors = {};

      (Object.keys(measurements) as (keyof MeasurementFields)[]).forEach(
        (key) => {
          const rawValue = measurements[key];
          const trimmed = rawValue ? String(rawValue).trim() : "";

          // Check empty input
          if (!trimmed) {
            newErrors[key] = "Measurement can't be empty";
            return;
          }

          const num = Number(trimmed);
          if (isNaN(num)) {
            newErrors[key] = "Invalid number";
          } else if (num < 0) {
            newErrors[key] = "Measurement Can't be negative";
          } else if (num === 0) {
            newErrors[key] = "Measurement Can't be 0";
          }
        },
      );

      setMeasurementErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [],
  );

  // Save measurements with submit validation
  const saveCustomerMeasurements = useCallback(
    async (
      customerId: number,
      measurementsPayload: Partial<Measurements>,
      measurementFields?: MeasurementFields,
    ): Promise<boolean> => {
      if (measurementFields) {
        const isValid = validateMeasurements(measurementFields);
        if (!isValid) return false;
      }

      try {
        await customerRepository.saveMeasurements(
          db,
          customerId,
          measurementsPayload,
        );
        setMeasurementErrors({});
        return true;
      } catch (error) {
        console.error("Failed to save customer measurements:", error);
        return false;
      }
    },
    [db, validateMeasurements],
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

  const clearMeasurementFieldError = useCallback(
    (field: keyof MeasurementFields) => {
      setMeasurementErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const clearAllMeasurementErrors = useCallback(() => {
    setMeasurementErrors({});
  }, []);

  return {
    customers,
    loading,
    loadingMore,
    hasMore,
    errors,
    measurementErrors,
    fetchCustomers,
    loadMoreCustomers,
    getCustomerById,
    getCustomerWithMeasurements,
    saveCustomerMeasurements,
    addCustomer,
    clearFieldError,
    clearMeasurementFieldError,
    clearAllMeasurementErrors,
    validateMeasurements,
  };
}
