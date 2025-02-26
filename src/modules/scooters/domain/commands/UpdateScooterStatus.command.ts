import { ScooterStatus } from "../entity/scooter.entity";

export interface UpdateScooterStatusCommandPayload {
  id: number;
  status: ScooterStatus;
}

export class UpdateScooterStatusCommand {
  readonly payload: UpdateScooterStatusCommandPayload;

  constructor(payload: UpdateScooterStatusCommandPayload) {
    this.payload = payload;
  }
}
