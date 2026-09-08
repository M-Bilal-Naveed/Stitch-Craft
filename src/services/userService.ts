import { createUser, getUserByEmail } from "@/repositories/userRepository";
import { RegisterUserInput } from "@/types/user";

export function registerUser(data: RegisterUserInput) {
  const email = data.email.trim().toLowerCase();

  const existingUser = getUserByEmail(email);

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  return createUser({
    ...data,
    name: data.name.trim(),
    shopName: data.shopName.trim(),
    email,
  });
}
