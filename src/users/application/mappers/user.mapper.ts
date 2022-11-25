import { RegisterUser } from '../messages/commands/register-user.command';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { UserUserAccountDto } from '../dtos/response/user-user-account.dto';
import { RegisterUserRequest } from '../dtos/request/register-user-request.dto';
import { RegisterUserResponse } from '../dtos/response/register-user-response.dto';
import { UserEntity } from 'src/users/infrastructure/persistence/entities/user.entity';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { User } from 'src/users/domain/aggregates/user/user.entity';
import { UserFullName } from 'src/shared/domain/values/full-name.value';
import { Nickname } from 'src/shared/domain/values/user-nick-name.value';
import { Password } from 'src/shared/domain/values/user-password.value';
import { Email } from 'src/shared/domain/values/email.value';
import { PhoneNumber } from 'src/shared/domain/values/phone-number.value';
import { UserFullNameValue } from 'src/users/infrastructure/persistence/values/user-full-name.value';
import { NicknameValue } from 'src/users/infrastructure/persistence/values/nickname.value';
import { PasswordValue } from 'src/users/infrastructure/persistence/values/password.value';
import { EmailValue } from 'src/users/infrastructure/persistence/values/email.value';
import { PhoneNumberValue } from 'src/users/infrastructure/persistence/values/phone-number.value';

export class UserMapper {
  public static dtoRequestToCommand(registerUserRequest: RegisterUserRequest) {
    return new RegisterUser(
      registerUserRequest.firstName,
      registerUserRequest.lastName,
      registerUserRequest.nickname,
      registerUserRequest.password,
      registerUserRequest.email,
      registerUserRequest.phoneNumber,
    );
  }

  public static domainToDtoResponse(user: User) {
    return new RegisterUserResponse(
      user.getId().getValue(),
      user.getName().getFirstName(),
      user.getName().getLastName(),
      user.getNickname().getValue(),
      user.getPassword().getValue(),
      user.getEmail().getValue(),
      user.getPhoneNumber().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterUser, userId: number): User {
    const userFullname: UserFullName = UserFullName.create(command.firstName, command.lastName);
    const nickname: Nickname = Nickname.create(command.nickname);
    const password: Password = Password.create(command.password);
    const email: Email = Email.create(command.email);
    const phoneNumber: PhoneNumber = PhoneNumber.create(command.phoneNumber);
    let user: User = UserFactory.from(userFullname, nickname, password, email, phoneNumber);
    return user;
  }

  public static domainToEntity(user: User): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.fullName = UserFullNameValue.from(user.getName().getFirstName(), user.getName().getLastName());
    userEntity.nickname = NicknameValue.from(user.getNickname().getValue());
    userEntity.password = PasswordValue.from(user.getPassword().getValue());
    userEntity.email = EmailValue.from(user.getEmail().getValue());
    userEntity.phoneNumber = PhoneNumberValue.from(user.getPhoneNumber().getValue());
    return userEntity;
  }

  public static entityToDomain(userEntity: UserEntity): User {
    if (userEntity == null) return null;
    const userFullname: UserFullName = UserFullName.create(userEntity.fullName.firstName, userEntity.fullName.lastName);
    const nickname: Nickname = Nickname.create(userEntity.nickname.value);
    const password: Password = Password.create(userEntity.password.value);
    const email: Email = Email.create(userEntity.email.value);
    const phoneNumber: PhoneNumber = PhoneNumber.create(userEntity.phoneNumber.value);
    const userId: UserId = UserId.of(userEntity.id);
    let user: User = UserFactory.withId(userId, userFullname, nickname, password, email, phoneNumber);
    return user;
  }

  public static ormToUserUserAccountDto(row: any): UserUserAccountDto {
    let dto = new UserUserAccountDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.nickname = row.nickname;
    dto.password = row.password;
    dto.email = row.email;
    dto.phoneNumber = row.phoneNumber;
    return dto;
  }
}