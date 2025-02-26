import {
  IEventListener,
  IEventStore,
  IDomainEvent,
} from "../../../../shared/domain";
import { MaintenanceScheduleDefinedEvent } from "../../domain/events/MaintenanceScheduleDefined.event";

export class MaintenanceScheduleDefinedListener implements IEventListener {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly handler: (event: MaintenanceScheduleDefinedEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe(
      "MaintenanceScheduleDefinedEvent",
      (event: IDomainEvent) => {
        this.handler(event as MaintenanceScheduleDefinedEvent);
      }
    );
  }
}
