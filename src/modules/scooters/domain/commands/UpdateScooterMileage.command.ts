export interface UpdateScooterMileageCommandPayload {
  id: number;
  mileage: number;
}

export class UpdateScooterMileageCommand {
  readonly payload: UpdateScooterMileageCommandPayload;

  constructor(payload: UpdateScooterMileageCommandPayload) {
    this.payload = payload;
  }
}
