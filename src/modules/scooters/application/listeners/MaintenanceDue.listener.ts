import {
  IEventListener,
  IEventStore,
  IDomainEvent,
} from "../../../../shared/domain";
import { MaintenanceDueEvent } from "../../domain/events/MaintenanceDue.event";

export class MaintenanceDueListener implements IEventListener {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly handler: (event: MaintenanceDueEvent) => void
  ) {}

  listen(): void {
    this.eventStore.subscribe("MaintenanceDueEvent", (event: IDomainEvent) => {
      this.handler(event as MaintenanceDueEvent);
    });
  }
}
