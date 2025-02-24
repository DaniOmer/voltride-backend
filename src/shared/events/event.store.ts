import { EventEmitter } from "events";

export interface IDomainEvent<TPayload = any> {
  readonly name: string;
  readonly occurredOn: Date;
  readonly payload: TPayload;
}

export interface IEventStore {
  publish(event: IDomainEvent): void;
  subscribe(eventName: string, handler: (event: IDomainEvent) => void): void;
}

export interface IEventListener {
  listen(): void;
}

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
