import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from 'src/comments/comment.entity';
import { CommentsService } from 'src/comments/comments.service';
import { CommentsController } from 'src/comments/comments.controller';
import { CommentsRepository } from 'src/comments/comments.repository';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticlesModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
