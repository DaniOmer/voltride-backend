import {
  IEventStore,
  IDomainEvent,
  IEventListener,
} from "../../../../shared/domain";

export interface UserCreatedEventPayload {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export class UserCreatedListener implements IEventListener {
  constructor(
    private eventStore: IEventStore,
    private handler: (event: IDomainEvent<UserCreatedEventPayload>) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe(
      "user.created",
      (event: IDomainEvent<UserCreatedEventPayload>) => {
        try {
          this.handler(event);
        } catch (error) {
          console.error("Error handling user.created event:", error);
        }
      }
    );
  }
}
