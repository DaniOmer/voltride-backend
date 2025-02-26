import {
  IEventListener,
  IEventStore,
  IDomainEvent,
} from "../../../../shared/domain";
import { FaultReportedEvent } from "../../domain/events/FaultReported.event";

export class FaultReportedListener implements IEventListener {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly handler: (event: FaultReportedEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe("FaultReportedEvent", (event: IDomainEvent) => {
      this.handler(event as FaultReportedEvent);
    });
  }
}
