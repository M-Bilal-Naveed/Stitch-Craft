import { createUser } from "@/repositories/userRepository";
import { RegisterFormErrors, RegisterUserInput } from "@/types/user";
import { validateRegisterForm } from "@/validation/registerValidation";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export function useRegister() {
  const db = useSQLiteContext();

  const [form, setForm] = useState<RegisterUserInput>({
    name: "",
    shopName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = (key: keyof RegisterUserInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (errors[key] || errors[key as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const submit = async (): Promise<boolean> => {
    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setLoading(true);
    setErrors({});

    try {
      await createUser(db, form);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ email: "This email is already registered." });
      setLoading(false);
      return false;
    }
  };

  return { form, errors, loading, updateField, submit };
}
