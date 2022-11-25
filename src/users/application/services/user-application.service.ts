import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserRequest } from '../dtos/request/register-user-request.dto';
import { RegisterUserResponse } from '../dtos/response/register-user-response.dto';
import { RegisterUserValidator } from '../validators/register-user.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterUser } from '../messages/commands/register-user.command';
import { UserRepository, USER_REPOSITORY } from 'src/users/domain/aggregates/User/user.repository';
import { User } from 'src/users/domain/aggregates/user/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerUserValidator: RegisterUserValidator,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async register(
    registerUserRequest: RegisterUserRequest,
  ): Promise<Result<AppNotification, RegisterUserResponse>> {
    const registerUser: RegisterUser = UserMapper.dtoRequestToCommand(registerUserRequest);
    const notification: AppNotification = await this.registerUserValidator.validate(registerUser);
    if (notification.hasErrors()) return Result.error(notification);
    const user: User = await this.commandBus.execute(registerUser);
    const response: RegisterUserResponse = UserMapper.domainToDtoResponse(user);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.userRepository.getById(id);
  }
}