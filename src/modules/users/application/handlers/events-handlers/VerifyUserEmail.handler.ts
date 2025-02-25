import {
  IDomainEvent,
  IEventStore,
  BadRequestError,
} from "../../../../../shared/domain";
import { IUserRepository } from "../../../application/repository/user.repository";
import { UserEmailValidatedEvent } from "../../../domain/events/UserEmailValidated.event";
import { TokenValidatedEventPayload } from "../../listeners/TokenValidated.listener";

export class VerifyUserEmailHandler {
  constructor(
    private readonly eventStore: IEventStore,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(event: IDomainEvent<TokenValidatedEventPayload>): Promise<void> {
    try {
      const { userUid, email } = event.payload;

      if (!userUid || !email) {
        throw new BadRequestError({
          message: "Invalid token payload",
          logging: true,
        });
      }

      const user = await this.userRepository.findByUid(userUid);

      if (!user) {
        throw new BadRequestError({
          message: "User not found",
          logging: true,
        });
      }

      user.verifyEmail();
      await this.userRepository.update(user);

      this.eventStore.publish(
        new UserEmailValidatedEvent({
          uid: user.uid,
          email: user.email,
        })
      );
    } catch (error) {
      console.error("Error verifying user email:", error);
      throw error;
    }
  }
}
