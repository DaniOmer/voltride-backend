import { User, IUserRepository } from "../../domain";
import { UserCreateCommand } from "../commands/UserCreate.command";
import { v4 as uuidv4 } from "uuid";
import { SecurityUtils } from "../../../../shared";

export class UserCreateHandler {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(command: UserCreateCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new Error("Email already exists");
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

    // Par exemple, on pourrait publier un événement
    // EventBus.publish(new UserCreatedEvent(createdUser));

    return createdUser;
  }
}
