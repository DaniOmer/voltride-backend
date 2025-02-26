import { ScooterStatus } from "../entity/scooter.entity";

export interface CreateScooterCommandPayload {
  serialNumber: string;
  modelId: number;
  modelUid: string;
  modelName: string;
  status?: ScooterStatus;
  batteryLevel?: number;
  mileage?: number;
  chargeCycles?: number;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
}

export class CreateScooterCommand {
  readonly payload: CreateScooterCommandPayload;

  constructor(payload: CreateScooterCommandPayload) {
    this.payload = payload;
  }
}
