import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserRegistered } from '../../../../users/domain/events/user-registered.event';

@EventsHandler(UserRegistered)
export class UserRegisteredHandler implements IEventHandler<UserRegistered> {
  constructor() {}

  async handle(event: UserRegistered) {
    console.log('############## Notifications Boundede Context ##############');
    console.log(event);
  }
}