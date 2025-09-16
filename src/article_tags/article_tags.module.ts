import { Module } from '@nestjs/common';
import { ArticleTagsService } from './article_tags.service';
import { ArticleTagsController } from './article_tags.controller';

@Module({
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService],
})
export class ArticleTagsModule {}
