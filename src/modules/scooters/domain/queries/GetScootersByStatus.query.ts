export interface GetScootersByStatusQueryPayload {
  status: string;
}

export class GetScootersByStatusQuery {
  readonly payload: GetScootersByStatusQueryPayload;

  constructor(payload: GetScootersByStatusQueryPayload) {
    this.payload = payload;
  }
}
