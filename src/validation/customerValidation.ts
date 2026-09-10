import { CustomerErrors } from "@/types/customer";

export function validateCustomerInput(form: {
  name?: string;
  phone?: string;
  address?: string;
  notes?: string;
}): CustomerErrors {
  const errors: CustomerErrors = {};

  const phoneRegex =
    /^(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/;

  if (!form.name?.trim()) {
    errors.name = "Customer name is required.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!form.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(form.phone.trim())) {
    errors.phone = "Please enter a valid phone number (e.g., 03XXXXXXXXX).";
  }

  return errors;
}
