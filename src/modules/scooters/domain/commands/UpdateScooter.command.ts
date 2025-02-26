import { ScooterStatus } from "../entity/scooter.entity";

export interface UpdateScooterCommandPayload {
  id: number;
  status?: ScooterStatus;
  batteryLevel?: number;
  mileage?: number;
  chargeCycles?: number;
  lastMaintenanceDate?: Date;
  lastTechnicalReviewDate?: Date;
  isActive?: boolean;
}

export class UpdateScooterCommand {
  readonly payload: UpdateScooterCommandPayload;

  constructor(payload: UpdateScooterCommandPayload) {
    this.payload = payload;
  }
}
