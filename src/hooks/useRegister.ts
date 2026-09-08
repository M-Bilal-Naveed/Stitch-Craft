import { createUser } from "@/repositories/userRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export function useRegister() {
  const db = useSQLiteContext(); // Access the provided SQLite instance

  const [form, setForm] = useState({
    name: "",
    shopName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (): Promise<boolean> => {
    setLoading(true);
    setErrors({});

    try {
      // Pass the db instance directly from SQLiteProvider
      await createUser(db, form);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false);
      return false;
    }
  };

  return { form, errors, loading, updateField, submit };
}
