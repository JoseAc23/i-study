import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterUserRequest } from 'src/users/application/dtos/request/register-user-request.dto';
import { UserApplicationService } from 'src/users/application/services/user-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterUserResponse } from 'src/users/application/dtos/response/register-user-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetUserUserAccount } from 'src/users/application/messages/queries/get-user-user-accounts.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users/user')
@ApiTags('user clients')
export class UserController {
  constructor(
    private readonly userApplicationService: UserApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register User Client' })
  
  async register(
    @Body() registerUserRequest: RegisterUserRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterUserRequest> = await this.userApplicationService.register(registerUserRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetUserUserAccount());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const user = await this.userApplicationService.getById(id);
      return ApiController.ok(response, user);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}