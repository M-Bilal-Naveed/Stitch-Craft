import { RegisterUserInput, User } from "@/types/user";
import { SQLiteDatabase } from "expo-sqlite";

export async function createUser(db: SQLiteDatabase, user: RegisterUserInput) {
  return await db.runAsync(
    `
      INSERT INTO users (
        name,
        shop_name,
        email,
        password_hash,
        created_at
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      user.name ?? "",
      user.shopName ?? "",
      user.email ?? "",
      user.password ?? "",
      new Date().toISOString(),
    ],
  );
}

export async function getUserByEmail(
  db: SQLiteDatabase,
  email: string,
): Promise<User | null> {
  if (!email) return null;

  return (
    (await db.getFirstAsync<User>(
      `
        SELECT *
        FROM users
        WHERE email = ?
      `,
      [email],
    )) ?? null
  );
}
