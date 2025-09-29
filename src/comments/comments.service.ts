import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';

import { CommentsRepository } from './comments.repository';
import { ArticlesService } from 'src/articles/articles.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  CommentResponseDto,
  CommentsListResponseDto,
} from './dto/comment-response.dto';
import { getLang } from 'src/common/utils/lang.util';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly articlesService: ArticlesService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  private async validateComment(
    id: number,
    userId: number,
    lang?: string,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findByIdWithRelations(id);
    if (!comment) {
      throw new NotFoundException(
        this.i18n.t('comment.errors.NOT_FOUND', { lang }),
      );
    }

    if (comment.author.id !== userId) {
      throw new ForbiddenException(
        this.i18n.t('comment.errors.NOT_ALLOWED', { lang }),
      );
    }

    return comment;
  }

  async create(
    userId: number,
    slug: string,
    createCommentDto: CreateCommentDto,
    i18n?: I18nContext,
  ): Promise<CommentResponseDto> {
    const lang = getLang(this.configService, i18n);

    const article = await this.articlesService.validateExistingArticle(
      slug,
      lang,
    );

    const comment = await this.commentsRepository.createEntityWithRelations({
      ...createCommentDto,
      author: { id: userId },
      article: { id: article.id },
    });

    if (!comment) {
      throw new NotFoundException(
        this.i18n.t('comment.errors.CREATE_FAILED', { lang }),
      );
    }

    this.logger.log(`Comment created with id: ${comment.id}`);

    return plainToInstance(
      CommentResponseDto,
      { comment: comment },
      { excludeExtraneousValues: true },
    );
  }

  async getAllByArticle(
    slug: string,
    i18n?: I18nContext,
  ): Promise<CommentsListResponseDto> {
    const lang = getLang(this.configService, i18n);

    const article = await this.articlesService.validateExistingArticle(
      slug,
      lang,
    );
    this.logger.log(`Comments retrieved for article: ${article.slug}`);

    const comments = await this.commentsRepository.findByArticleId(article.id);

    return plainToInstance(
      CommentsListResponseDto,
      { comments: comments },
      { excludeExtraneousValues: true },
    );
  }

  async deleteComment(
    userId: number,
    slug: string,
    id: number,
    i18n?: I18nContext,
  ): Promise<{ status: boolean }> {
    const lang = getLang(this.configService, i18n);

    await this.articlesService.validateExistingArticle(slug, lang);
    await this.validateComment(id, userId, lang);
    await this.commentsRepository.deleteEntity(id);

    this.logger.log(`Comment deleted with id: ${id} for article: ${slug}`);

    return { status: true };
  }
}
