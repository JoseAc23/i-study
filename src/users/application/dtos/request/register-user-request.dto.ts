export class RegisterUserRequest {
    constructor(
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly nickname: string,
      public readonly password: string,
      public readonly email: string,
      public readonly phoneNumber: string,
    ) {}
  }