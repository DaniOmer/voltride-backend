import { v4 as uuidv4 } from "uuid";

import { SecurityUtils } from "../../../../shared";
import { BadRequestError } from "../../../../shared/domain";

export enum TokenType {
  Confirmation = "confirmation",
  Invitation = "invitation",
  PasswordReset = "passwordReset",
}

export enum TokenStatus {
  Pending = "pending",
  Used = "used",
  Expired = "expired",
}

export interface IToken {
  id?: number;
  uid: string;
  userUid: string;
  email: string;
  hash: string;
  type: TokenType;
  status: TokenStatus;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Token {
  private props: IToken;

  constructor(props: IToken) {
    this.props = props;
  }

  public static async create(
    userUid: string,
    email: string,
    type: TokenType,
    expiresIn: number
  ): Promise<Token> {
    const uid = uuidv4();

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    const hash = await SecurityUtils.generateRandomToken();

    return new Token({
      uid,
      userUid,
      email,
      hash,
      type,
      status: TokenStatus.Pending,
      expiresAt,
    });
  }

  get id() {
    return this.props.id;
  }

  get uid() {
    return this.props.uid;
  }

  get userUid() {
    return this.props.userUid;
  }

  get email() {
    return this.props.email;
  }

  get hash() {
    return this.props.hash;
  }

  get type() {
    return this.props.type;
  }

  get status() {
    return this.props.status;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public isExpired(): boolean {
    return new Date() > this.props.expiresAt;
  }

  public markAsUsed(): void {
    if (this.props.status !== TokenStatus.Pending) {
      throw new BadRequestError({
        code: 400,
        message: "Token is already used or expired.",
        logging: true,
      });
    }
    this.props.status = TokenStatus.Used;
  }

  public markAsExpired(): void {
    this.props.status = TokenStatus.Expired;
  }

  public toJSON(): IToken {
    return this.props;
  }
}
