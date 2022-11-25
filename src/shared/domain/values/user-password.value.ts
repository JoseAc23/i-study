import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Password {
  private readonly password: string;
  private static MAX_LENGTH: number = 25;

  private constructor(password: string) {
    this.password = password;
  }

  public getValue(): string {
    return this.password;
  }

  public static create(password: string): Password {
    password = (password ?? "").trim();
    return new Password(password);
  }

  public static createv2(password: string): Result<AppNotification, Password> {
    let notification: AppNotification = new AppNotification();
    password = (password ?? "").trim();
    if (password === "") {
      notification.addError('password is required', null);
    }
    if (password.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an password is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Password(password));
  }
}