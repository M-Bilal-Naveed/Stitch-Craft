import { RegisterFormErrors } from "@/types/user";

export function validateLoginInput(form: {
  email?: string;
  password?: string;
}): RegisterFormErrors {
  const errors: RegisterFormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Password is required.";
  }

  return errors;
}
