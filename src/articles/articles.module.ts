import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from './article.entity';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TagsModule,
    UsersModule,
    FavoritesModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
  exports: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
