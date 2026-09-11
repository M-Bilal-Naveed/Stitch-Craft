import { OrderErrors, OrderInput } from "@/types/order";

export function validateOrderInput(form: Partial<OrderInput>): OrderErrors {
  const errors: OrderErrors = {};

  if (!form.customer_id || Number(form.customer_id) <= 0) {
    errors.customer_id = "Please select a valid customer.";
  }

  if (!form.cloth_type?.trim()) {
    errors.cloth_type = "Cloth type is required (e.g., Kurta, Shalwar Kameez).";
  }

  if (!form.delivery_date?.trim()) {
    errors.delivery_date = "Delivery date is required.";
  }

  const totalPrice = Number(form.total_price);
  if (
    form.total_price === undefined ||
    form.total_price === "" ||
    isNaN(totalPrice)
  ) {
    errors.total_price = "Total price is required.";
  } else if (totalPrice < 0) {
    errors.total_price = "Total price cannot be negative.";
  }

  const advancePayment = Number(form.advance_payment ?? 0);
  if (isNaN(advancePayment) || advancePayment < 0) {
    errors.advance_payment =
      "Advance payment must be a valid non-negative number.";
  } else if (totalPrice > 0 && advancePayment > totalPrice) {
    errors.advance_payment = "Advance payment cannot exceed total price.";
  }

  return errors;
}
