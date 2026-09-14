export interface MeasurementFields {
  kameez_length: string;
  chest: string;
  waist: string;
  shoulder: string;
  sleeve_length: string;
  trouser_length: string;
  collar: string;
  bicep: string;
  armhole: string;
  cuff: string;
  hip: string;
  pancha: string;
}

export type MeasurementKey = keyof MeasurementFields;

export interface MeasurementPayload {
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
