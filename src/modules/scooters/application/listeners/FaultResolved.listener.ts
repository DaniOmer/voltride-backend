import {
  IEventListener,
  IEventStore,
  IDomainEvent,
} from "../../../../shared/domain";
import { FaultResolvedEvent } from "../../domain/events/FaultResolved.event";

export class FaultResolvedListener implements IEventListener {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly handler: (event: FaultResolvedEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe("FaultResolvedEvent", (event: IDomainEvent) => {
      this.handler(event as FaultResolvedEvent);
    });
  }
}
