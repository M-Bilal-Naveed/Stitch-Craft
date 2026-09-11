import { OrderStatus } from "@/types/orderStatus";

export interface Order {
  id: number;
  customer_id: number;
  customer_name?: string;
  customer_phone?: string;
  cloth_type: string;
  delivery_date: string;
  total_price: number;
  advance_payment: number;
  special_request?: string | null;
  created_at: string;
  status: OrderStatus;
  status_updated_at?: string;
}

export interface OrderInput {
  customer_id: number;
  cloth_type: string;
  delivery_date: string;
  total_price: number | string;
  advance_payment?: number | string;
  special_request?: string;
  status?: OrderStatus;
}

export interface OrderErrors {
  customer_id?: string;
  cloth_type?: string;
  delivery_date?: string;
  total_price?: string;
  advance_payment?: string;
}
