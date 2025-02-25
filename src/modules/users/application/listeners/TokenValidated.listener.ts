import {
  IEventStore,
  IDomainEvent,
  IEventListener,
} from "../../../../shared/domain";

export interface TokenValidatedEventPayload {
  uid: string;
  userUid: string;
  email: string;
  type: string;
}

export class TokenValidatedListener implements IEventListener {
  constructor(
    private eventStore: IEventStore,
    private handler: (event: IDomainEvent<TokenValidatedEventPayload>) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe(
      "confirmation.token.validated",
      (event: IDomainEvent<TokenValidatedEventPayload>) => {
        try {
          this.handler(event);
        } catch (error) {
          console.error("Error handling token.validated event:", error);
        }
      }
    );
  }
}
