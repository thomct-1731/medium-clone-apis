import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { CustomI18nModule } from './i18n/i18n.module';
import { UsersModule } from './users/users.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
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
    ArticlesModule,
    TagsModule,
    RouterModule.register([
      {
        path: 'articles/:slug/comments',
        module: CommentsModule,
      },
    ]),
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
