export interface GetScootersByModelQueryPayload {
  modelId: number;
}

export class GetScootersByModelQuery {
  readonly payload: GetScootersByModelQueryPayload;

  constructor(payload: GetScootersByModelQueryPayload) {
    this.payload = payload;
  }
}
