export interface UserCreateDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface EmailValidationDTO {
  token: string;
}
