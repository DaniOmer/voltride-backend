export interface CreateScooterModelDTO {
  name: string;
  manufacturer: string;
  maxSpeed: number;
  maxRange: number;
  batteryCapacity: number;
  weight: number;
  maxWeight: number;
  dimensions: string;
  releaseYear: number;
  warrantyPeriod?: number;
}

export interface UpdateScooterModelDTO {
  name?: string;
  manufacturer?: string;
  maxSpeed?: number;
  maxRange?: number;
  batteryCapacity?: number;
  weight?: number;
  maxWeight?: number;
  dimensions?: string;
  releaseYear?: number;
  warrantyPeriod?: number;
}
