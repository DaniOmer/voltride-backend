import { IToken } from "../entity/token.entity";

export interface ITokenRepository {
  create(token: IToken): Promise<IToken>;
  findAll(): Promise<IToken[]>;
  findById(id: string): Promise<IToken | null>;
  findByUser(userId: number): Promise<IToken | null>;
  findByHash(hash: string): Promise<IToken | null>;
  update(token: IToken): Promise<IToken>;
  delete(id: string): Promise<void>;
}
