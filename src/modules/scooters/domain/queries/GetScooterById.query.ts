export interface GetScooterByIdQueryPayload {
  id: number;
}

export class GetScooterByIdQuery {
  readonly payload: GetScooterByIdQueryPayload;

  constructor(payload: GetScooterByIdQueryPayload) {
    this.payload = payload;
  }
}
