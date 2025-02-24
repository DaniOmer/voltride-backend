import { IEventStore, IDomainEvent, IEventListener } from "../../../../shared";

export class UserCreatedListener implements IEventListener {
  constructor(
    private eventStore: IEventStore,
    private handler: (event: IDomainEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe("user.created", (event: IDomainEvent) => {
      this.handler(event);
    });
  }
}
