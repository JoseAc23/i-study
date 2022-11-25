import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Nickname {
  private readonly nickname: string;
  private static MAX_LENGTH: number = 25;

  private constructor(nickname: string) {
    this.nickname = nickname;
  }

  public getValue(): string {
    return this.nickname;
  }

  public static create(nickname: string): Nickname {
    nickname = (nickname ?? "").trim();
    return new Nickname(nickname);
  }

  public static createv2(nickname: string): Result<AppNotification, Nickname> {
    let notification: AppNotification = new AppNotification();
    nickname = (nickname ?? "").trim();
    if (nickname === "") {
      notification.addError('nickname is required', null);
    }
    if (nickname.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an nickname is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Nickname(nickname));
  }
}