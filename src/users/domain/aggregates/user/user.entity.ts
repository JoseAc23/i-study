import { UserType } from './user-type.enum';
import { UserRegistered } from 'src/users/domain/events/user-registered.event';
import { UserFullName } from 'src/shared/domain/values/full-name.value';
import { Email } from 'src/shared/domain/values/email.value';
import { PhoneNumber } from 'src/shared/domain/values/phone-number.value';
import { UserId } from './user-id.value';
import { Password } from 'src/shared/domain/values/user-password.value';
import { Nickname } from 'src/shared/domain/values/user-nick-name.value';
import { UserAccount } from './user-account.root.entity';

export class User extends UserAccount {
  protected fullName: UserFullName;
  private nickname: Nickname;
  private password: Password;
  private email: Email;
  private phoneNumber: PhoneNumber; 


  public constructor(fullName: UserFullName, nickname: Nickname, password: Password, email: Email, phoneNumber: PhoneNumber) {
    super(UserType.USER);
    this.fullName = fullName;
    this.nickname = nickname;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public register() {
    const event = new UserRegistered(this.id.getValue(), this.fullName.getFirstName(), this.fullName.getLastName(), this.nickname.getValue(), this.password.getValue(), this.email.getValue(), this.phoneNumber.getValue());
    this.apply(event);
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): UserFullName {
    return this.fullName;
  }

  public getNickname(): Nickname{
    return this.nickname;
  }

  public getPassword(): Password{
    return this.password;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

  public changeName(fullName: UserFullName): void {
    this.fullName = fullName;
  }
}