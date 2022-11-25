import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Email {
  private readonly email: string;
  private static MAX_LENGTH: number = 45;

  private constructor(email: string) {
    this.email = email;
  }

  public getValue(): string {
    return this.email;
  }

  public static create(email: string): Email {
    email = (email ?? "").trim();
    return new Email(email);
  }

  public static createv2(email: string): Result<AppNotification, Email> {
    let notification: AppNotification = new AppNotification();
    email = (email ?? "").trim();
    if (email === "") {
      notification.addError('email is required', null);
    }
    if (email.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an email is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Email(email));
  }
}