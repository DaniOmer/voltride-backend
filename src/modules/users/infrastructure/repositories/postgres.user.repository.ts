import { User } from "../../domain";
import { IUserRepository } from "../../application/repository/user.repository";
import { UserModel } from "../models/user.model";

export class PostgresUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    await UserModel.create({
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: user.address,
      isEmailVerified: user.isEmailVerified,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const userModels = await UserModel.findAll();
    return userModels.map((userModel) => {
      return new User({
        uid: userModel.uid,
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        email: userModel.email,
        password: userModel.password,
        phoneNumber: userModel.phoneNumber,
        address: userModel.address,
        isEmailVerified: userModel.isEmailVerified,
        createdAt: userModel.createdAt,
        updatedAt: userModel.updatedAt,
      });
    });
  }

  async findById(id: number): Promise<User | null> {
    const userModel = await UserModel.findByPk(id);
    if (!userModel) return null;
    return new User({
      uid: userModel.uid,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      email: userModel.email,
      password: userModel.password,
      phoneNumber: userModel.phoneNumber,
      address: userModel.address,
      isEmailVerified: userModel.isEmailVerified,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  }

  async findByUid(uid: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { uid } });
    if (!userModel) return null;
    return new User({
      uid: userModel.uid,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      email: userModel.email,
      password: userModel.password,
      phoneNumber: userModel.phoneNumber,
      address: userModel.address,
      isEmailVerified: userModel.isEmailVerified,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ where: { email } });
    if (!userModel) return null;
    return new User({
      uid: userModel.uid,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      email: userModel.email,
      password: userModel.password,
      phoneNumber: userModel.phoneNumber,
      address: userModel.address,
      isEmailVerified: userModel.isEmailVerified,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    });
  }

  async update(user: User): Promise<User> {
    await UserModel.update(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        address: user.address,
        isEmailVerified: user.isEmailVerified,
      },
      { where: { uid: user.uid } }
    );
    return user;
  }

  async delete(id: string): Promise<void> {
    await UserModel.destroy({ where: { id } });
  }
}
