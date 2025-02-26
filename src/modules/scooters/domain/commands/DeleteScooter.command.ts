export interface DeleteScooterCommandPayload {
  id: number;
}

export class DeleteScooterCommand {
  readonly payload: DeleteScooterCommandPayload;

  constructor(payload: DeleteScooterCommandPayload) {
    this.payload = payload;
  }
}
