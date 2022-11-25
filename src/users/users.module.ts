import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserValidator } from './application/validators/register-user.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegisteredHandler } from '../notifications/application/handlers/events/user-registered.handler';
import { GetUserUserAccountHandler } from './application/handlers/queries/get-user-user-accounts.handler';
import { UserApplicationService } from './application/services/user-application.service';
import { RegisterUserHandler } from './application/handlers/commands/register-user.handler';
import { UserAccountEntity } from './infrastructure/persistence/entities/user-account.entity';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserController } from './interface/rest/user.controller';
import { UserEntityRepository } from './infrastructure/persistence/repositories/user.repository';
import { USER_REPOSITORY } from './domain/aggregates/user/user.repository';

export const CommandHandlers = [RegisterUserHandler];
export const EventHandlers = [UserRegisteredHandler];
export const QueryHandlers = [GetUserUserAccountHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([UserAccountEntity, UserEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [
    { useClass: UserEntityRepository, provide: USER_REPOSITORY },
    UserApplicationService,
    RegisterUserValidator,
    UserEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UsersModule {}