import { DomainEvent } from "../../../../shared";
import { User } from "../entities/user.entity";

export class UserCreatedEvent implements DomainEvent {
  public readonly eventName = "UserCreated";
  public readonly occurredOn: Date;

  constructor(public readonly user: User) {
    this.occurredOn = new Date();
  }
}
