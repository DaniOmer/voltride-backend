export interface UpdateScooterBatteryCommandPayload {
  id: number;
  batteryLevel: number;
}

export class UpdateScooterBatteryCommand {
  readonly payload: UpdateScooterBatteryCommandPayload;

  constructor(payload: UpdateScooterBatteryCommandPayload) {
    this.payload = payload;
  }
}
