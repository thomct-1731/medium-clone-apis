import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomI18nModule } from './i18n/i18n.module';
import { UsersModule } from './users/users.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    CustomI18nModule,
    UsersModule,
    UserTokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
