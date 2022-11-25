import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { IdentitysModule } from './identitys/identitys.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: 'mysql://root:root@localhost:3307/istudy',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        'dist/**/infrastructure/persistence/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
        'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    UsersModule,
    IdentitysModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
