export interface Customer {
  id?: number;
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  created_at?: string;
}

export interface CustomerErrors {
  name?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface Measurements {
  id?: number;
  customer_id?: number;
  kameez_length?: number;
  chest?: number;
  waist?: number;
  shoulder?: number;
  sleeve_length?: number;
  trouser_length?: number;
  collar?: number;
  bicep?: number;
  armhole?: number;
  cuff?: number;
  hip?: number;
  pancha?: number;
  notes?: string;
}

export interface CustomerInput {
  name: string;
  phone: string;
  address?: string;
  notes?: string;
  measurements?: Measurements;
}
