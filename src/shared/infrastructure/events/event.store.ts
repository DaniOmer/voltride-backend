import { EventEmitter } from "events";
import { IDomainEvent } from "../../domain";

export class EventStore extends EventEmitter {
  private static instance: EventStore;
  events: IDomainEvent[] = [];

  private constructor() {
    super();
  }

  static getInstance(): EventStore {
    if (!EventStore.instance) {
      EventStore.instance = new EventStore();
    }
    return EventStore.instance;
  }

  publish(event: any) {
    this.events.push(event);
    this.emit(event.name, event);
  }

  subscribe(eventName: string, handler: (event: IDomainEvent) => void) {
    this.on(eventName, handler);
  }
}
