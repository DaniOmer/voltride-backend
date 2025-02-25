import { Token, IToken, ITokenRepository } from "../../domain";
import { TokenModel } from "../models/token.model";

export class PostgresTokenRepository implements ITokenRepository {
  async create(token: Token): Promise<IToken> {
    const tokenData = {
      uid: token.uid,
      userUid: token.userUid,
      hash: token.hash,
      type: token.type,
      status: token.status,
      expiresAt: token.expiresAt,
    };

    return await TokenModel.create(tokenData);
  }

  async findAll(): Promise<IToken[]> {
    return await TokenModel.findAll();
  }

  async findById(id: string): Promise<IToken | null> {
    return await TokenModel.findByPk(id);
  }

  async findByUser(userUid: number): Promise<IToken | null> {
    return await TokenModel.findOne({ where: { userUid } });
  }

  async update(token: Token): Promise<IToken> {
    const tokenData = {
      uid: token.uid,
      userUid: token.userUid,
      hash: token.hash,
      type: token.type,
      status: token.status,
      expiresAt: token.expiresAt,
    };

    await TokenModel.update(tokenData, { where: { id: token.id } });
    return token;
  }

  async delete(id: string): Promise<void> {
    await TokenModel.destroy({ where: { id } });
  }
}
