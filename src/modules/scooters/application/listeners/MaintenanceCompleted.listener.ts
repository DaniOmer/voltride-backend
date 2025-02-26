import {
  IEventListener,
  IEventStore,
  IDomainEvent,
} from "../../../../shared/domain";
import { MaintenanceCompletedEvent } from "../../domain/events/MaintenanceCompleted.event";

export class MaintenanceCompletedListener implements IEventListener {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly handler: (event: MaintenanceCompletedEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe(
      "MaintenanceCompletedEvent",
      (event: IDomainEvent) => {
        this.handler(event as MaintenanceCompletedEvent);
      }
    );
  }
}
