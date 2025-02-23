export interface IUser {
  id?: number;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  public readonly id?: number;
  public uid: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public address?: string;
  public phoneNumber?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IUser) {
    this.uid = data.uid;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.phoneNumber = data.phoneNumber;
    this.address = data.address;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}
