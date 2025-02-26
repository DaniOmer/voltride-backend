export interface GetScooterByUidQueryPayload {
  uid: string;
}

export class GetScooterByUidQuery {
  readonly payload: GetScooterByUidQueryPayload;

  constructor(payload: GetScooterByUidQueryPayload) {
    this.payload = payload;
  }
}
