import { EventEmitter } from "events";
import { IDomainEvent } from "../../domain";

export class EventStore extends EventEmitter {
  events: IDomainEvent[] = [];

  publish(event: any) {
    this.events.push(event);
    this.emit(event.name, event);
  }

  subscribe(eventName: string, handler: (event: IDomainEvent) => void) {
    this.on(eventName, handler);
  }
}
