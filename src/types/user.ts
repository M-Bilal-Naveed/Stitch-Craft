export interface User {
  id: number;
  name: string;
  shop_name: string;
  email: string;
  password: string;
  created_at: string;
}

export interface RegisterUserInput {
  name: string;
  shopName: string;
  email: string;
  password: string;
}

export interface RegisterFormErrors {
  name?: string;
  shopName?: string;
  email?: string;
  password?: string;
}
