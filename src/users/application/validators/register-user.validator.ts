import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterUser } from '../messages/commands/register-user.command';
import { UserRepository, USER_REPOSITORY } from 'src/users/domain/aggregates/user/user.repository';
import { User } from 'src/users/domain/aggregates/user/user.entity';

@Injectable()
export class RegisterUserValidator {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {
  }
  
  public async validate(registerUser: RegisterUser,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerUser.firstName ? registerUser.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerUser.lastName ? registerUser.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const email: string = registerUser.email ? registerUser.email.trim() : '';
    if (email.length <= 0) {
      notification.addError('email is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    
    const user: User = await this.userRepository.getByEmail(email);
    if (user != null) notification.addError('email is taken', null);
    
    return notification;
  }
}