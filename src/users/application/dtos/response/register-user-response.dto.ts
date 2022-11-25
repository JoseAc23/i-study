export class RegisterUserResponse {
    constructor(
      public id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly nickname: string,
      public readonly password: string,
      public readonly email: string,
      public readonly phoneNumber: string,
    ) {}
  }