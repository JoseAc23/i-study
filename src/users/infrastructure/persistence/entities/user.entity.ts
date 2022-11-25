import { NicknameValue } from 'src/users/infrastructure/persistence/values/nickname.value';
import { PasswordValue } from 'src/users/infrastructure/persistence/values/password.value';
import { EmailValue } from 'src/users/infrastructure/persistence/values/email.value';
import { PhoneNumberValue } from 'src/users/infrastructure/persistence/values/phone-number.value';
import { UserFullNameValue } from '../values/user-full-name.value';
import { ChildEntity, Column } from 'typeorm';
import { UserType } from '../../../domain/aggregates/user/user-type.enum';
import { UserAccountEntity } from './user-account.entity';

@ChildEntity(UserType.USER)
export class UserEntity extends UserAccountEntity {
  @Column((type) => UserFullNameValue, { prefix: false })
  public fullName: UserFullNameValue;

  @Column((type) => NicknameValue, { prefix: false })
  public nickname: NicknameValue;

  @Column((type) => PasswordValue, { prefix: false })
  public password: PasswordValue;

  @Column((type) => EmailValue, { prefix: false })
  public email: EmailValue;

  @Column((type) => PhoneNumberValue, { prefix: false })
  public phoneNumber: PhoneNumberValue;
}