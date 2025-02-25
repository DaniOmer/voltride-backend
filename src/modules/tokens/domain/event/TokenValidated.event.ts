import { IDomainEvent } from "../../../../shared/domain";
import { TokenType } from "../entity/token.entity";

export interface TokenValidatedPayload {
  uid: string;
  userUid: string;
  email: string;
  type: TokenType;
}

export class TokenValidatedEvent
  implements IDomainEvent<TokenValidatedPayload>
{
  public readonly name: string;
  public readonly occurredOn: Date;
  public readonly payload: TokenValidatedPayload;

  constructor(payload: TokenValidatedPayload) {
    this.name = payload.type + ".token.validated";
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
