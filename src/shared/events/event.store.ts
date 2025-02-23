import { EventEmitter } from "events";

export class EventStore extends EventEmitter {
  events: any[] = [];

  publish(event: any) {
    this.events.push(event);
    this.emit(event.constructor.name, event);
  }

  subscribe(eventName: string, handler: (event: any) => void) {
    this.on(eventName, handler);
  }
}
