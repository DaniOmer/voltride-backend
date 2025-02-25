export class UserCreateCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phoneNumber?: string,
    public readonly address?: string
  ) {}
}
