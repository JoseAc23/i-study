import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUser } from '../../messages/commands/register-user.command';
import { UserMapper } from '../../mappers/user.mapper';
import { User } from 'src/users/domain/aggregates/user/user.entity';
import { Inject } from '@nestjs/common';
import { UserRepository, USER_REPOSITORY } from 'src/users/domain/aggregates/user/user.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterUser)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUser> {
  constructor(
    private dataSource: DataSource,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterUser) {
    let user: User = UserMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        user = await this.userRepository.create(user);
      if (user == null) throw new Error("");
      user = this.publisher.mergeObjectContext(user);
      user.register();
      user.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      user = null;
    } finally {
      await queryRunner.release();
    }
    return user;
  }
}