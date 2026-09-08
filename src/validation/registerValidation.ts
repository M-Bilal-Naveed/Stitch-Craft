import { RegisterFormErrors, RegisterUserInput } from "@/types/user";

export function validateRegisterForm(
  data: RegisterUserInput,
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!data.shopName.trim()) {
    errors.shopName = "Shop name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}
