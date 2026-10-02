import { OrderErrors, OrderInput } from "@/types/order";

export function validateOrderInput(form: Partial<OrderInput>): OrderErrors {
  const errors: OrderErrors = {};

  // Validate customer selection
  if (!form.customer_id || Number(form.customer_id) <= 0) {
    errors.customer_id = "please select customer";
  }

  // Validate cloth type
  if (!form.cloth_type?.trim()) {
    errors.cloth_type = "Cloth type is required.";
  }

  // Validate delivery date
  if (!form.delivery_date?.trim()) {
    errors.delivery_date = "Delivery date is required.";
  }

  // Validate total price / amount
  const totalPrice = Number(form.total_price);
  if (
    form.total_price === undefined ||
    form.total_price === "" ||
    isNaN(totalPrice) ||
    totalPrice <= 0
  ) {
    errors.total_price = "please enter the amount";
  }

  // Validate advance payment
  const advancePayment = Number(form.advance_payment ?? 0);
  if (isNaN(advancePayment) || advancePayment < 0) {
    errors.advance_payment = "Please enter a valid advance payment.";
  } else if (totalPrice > 0 && advancePayment > totalPrice) {
    errors.advance_payment = "Advance payment cannot exceed total price.";
  }

  return errors;
}
