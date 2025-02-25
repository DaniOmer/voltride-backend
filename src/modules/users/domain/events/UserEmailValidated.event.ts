import { IDomainEvent } from "../../../../shared/domain";

export interface UserEmailValidatedPayload {
  uid: string;
  email: string;
}

export class UserEmailValidatedEvent
  implements IDomainEvent<UserEmailValidatedPayload>
{
  public readonly name: string;
  public readonly occurredOn: Date;
  public readonly payload: UserEmailValidatedPayload;

  constructor(payload: UserEmailValidatedPayload) {
    this.name = "user.email.validated";
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
