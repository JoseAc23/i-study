import { Email } from 'src/shared/domain/values/email.value';
import { PhoneNumber } from 'src/shared/domain/values/phone-number.value';
import { Nickname } from 'src/shared/domain/values/user-nick-name.value';
import { Password } from 'src/shared/domain/values/user-password.value';
import { UserFullName } from '../../../shared/domain/values/full-name.value';
import { UserId } from '../aggregates/user/user-id.value';
import { User } from '../aggregates/user/user.entity';

export class UserFactory {
  public static withId(id: UserId, fullName: UserFullName, nickname: Nickname, password: Password, email: Email, phoneNumber: PhoneNumber): User {
    let user: User = new User(fullName, nickname, password, email, phoneNumber);
    user.changeId(id);
    return user;
  }

  public static from(fullName: UserFullName, nickname: Nickname, password: Password, email: Email, phoneNumber: PhoneNumber): User {
    return new User(fullName, nickname, password, email, phoneNumber);
  }
}