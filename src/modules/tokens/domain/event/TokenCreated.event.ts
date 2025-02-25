import { IDomainEvent } from "../../../../shared/domain";
import { TokenType } from "../entity/token.entity";

export interface TokenCreatedPayload {
  uid: string;
  hash: string;
  type: TokenType;
}

export class TokenCreatedEvent implements IDomainEvent<TokenCreatedPayload> {
  public readonly name: string;
  public readonly occurredOn: Date;
  public readonly payload: TokenCreatedPayload;

  constructor(payload: TokenCreatedPayload) {
    this.name = payload.type + ".token.created";
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
