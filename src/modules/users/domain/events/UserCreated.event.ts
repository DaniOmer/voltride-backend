import { IDomainEvent } from "../../../../shared";

export interface UserCreatedPayload {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export class UserCreatedEvent implements IDomainEvent<UserCreatedPayload> {
  public readonly name: string;
  public readonly occurredOn: Date;
  public readonly payload: UserCreatedPayload;

  constructor(payload: UserCreatedPayload) {
    this.name = "user.created";
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
