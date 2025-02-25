import { v4 as uuidv4 } from "uuid";

import { User, UserCreatedEvent, UserCreateCommand } from "../../../domain";
import { IUserRepository } from "../../repository/user.repository";

import { SecurityUtils } from "../../../../../shared";
import { IEventStore } from "../../../../../shared/domain";
import { BadRequestError } from "../../../../../shared/domain";

export class UserCreateHandler {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventStore: IEventStore
  ) {}

  async execute(command: UserCreateCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new BadRequestError({
        message: "Account with this email already exists",
        logging: true,
      });
    }

    const hashedPassword = await SecurityUtils.hashPassword(command.password);

    const user = new User({
      uid: uuidv4(),
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      password: hashedPassword,
      phoneNumber: command.phoneNumber,
      address: command.address,
    });

    const createdUser = await this.userRepository.create(user);
    const payload = {
      uid: createdUser.uid,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
    };
    this.eventStore.publish(new UserCreatedEvent(payload));

    return createdUser;
  }
}
