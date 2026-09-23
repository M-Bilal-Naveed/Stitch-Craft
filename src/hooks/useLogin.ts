import { getUserByEmail } from "@/repositories/userRepository";
import { RegisterFormErrors } from "@/types/user";
import { validateLoginInput } from "@/validation/loginValidations";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

export function useLogin() {
  const db = useSQLiteContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof RegisterFormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const submit = async (): Promise<boolean> => {
    // 1. Run isolated validation
    const validationErrors = validateLoginInput(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setLoading(true);
    setErrors({});

    try {
      const user = await getUserByEmail(db, form.email);

      if (!user) {
        setErrors({ email: "No account found with this email." });
        setLoading(false);
        return false;
      }

      if (user.password_hash !== form.password) {
        setErrors({ password: "Incorrect password." });
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ email: "An error occurred during login." });
      setLoading(false);
      return false;
    }
  };

  return { form, errors, loading, updateField, submit };
}
