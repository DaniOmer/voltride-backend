import {
  IEventStore,
  IDomainEvent,
  IEventListener,
} from "../../../../shared/domain";

export class TokenCreatedListener implements IEventListener {
  constructor(
    private eventStore: IEventStore,
    private handler: (event: IDomainEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe(
      "confirmation.token.created",
      (event: IDomainEvent) => {
        this.handler(event);
      }
    );
  }
}
