import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';

import { ArticlesRepository } from './articles.repository';
import { TagsService } from '../tags/tags.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { getLang } from 'src/common/utils/lang.util';
import { flattenText } from 'src/common/utils/string.util';
import { ARTICLE_CONSTANTS } from './article.constant';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly tagsService: TagsService,
  ) {}

  private async validateUniqueArticle(
    title: string,
    lang?: string,
  ): Promise<void> {
    const slug = flattenText(title, ARTICLE_CONSTANTS.SLUG.MAX_LENGTH);
    const existingArticle = await this.articlesRepository.findBySlug(slug);
    if (existingArticle) {
      throw new BadRequestException(
        this.i18n.t('article.errors.ARTICLE_EXISTS', { lang }),
      );
    }
  }

  private async validateArticle(
    slug: string,
    lang?: string,
    userId?: number,
  ): Promise<Article> {
    const article = await this.articlesRepository.findBySlug(slug);
    if (!article) {
      throw new NotFoundException(
        this.i18n.t('article.errors.NOT_FOUND', { lang }),
      );
    }

    if (userId && article.author.id !== userId) {
      throw new ForbiddenException(
        this.i18n.t('article.errors.NOT_ALLOWED', { lang }),
      );
    }

    return article;
  }

  private async getSingleArticle(
    slug: string,
    lang?: string,
  ): Promise<ArticleResponseDto> {
    return plainToInstance(
      ArticleResponseDto,
      { article: await this.validateArticle(slug, lang) },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async create(
    userId: number,
    articleData: CreateArticleDto,
    i18n?: I18nContext,
  ): Promise<ArticleResponseDto> {
    const lang = getLang(this.configService, i18n);

    await this.validateUniqueArticle(articleData.title, lang);

    const tagList = articleData.tagList?.length
      ? await this.tagsService.createTags(articleData.tagList)
      : [];

    const article = await this.articlesRepository.createEntity({
      ...articleData,
      author: { id: userId },
      tagList,
    });

    this.logger.log(`Article created with slug: ${article.slug}`);

    return this.getSingleArticle(article.slug, lang);
  }

  async getArticleBySlug(
    slug: string,
    i18n?: I18nContext,
  ): Promise<ArticleResponseDto> {
    const lang = getLang(this.configService, i18n);
    return this.getSingleArticle(slug, lang);
  }

  async updateArticle(
    userId: number,
    slug: string,
    articleData: UpdateArticleDto,
    i18n?: I18nContext,
  ): Promise<ArticleResponseDto> {
    const lang = getLang(this.configService, i18n);

    const article = await this.validateArticle(slug, lang, userId);

    if (articleData.title && articleData.title !== article.title) {
      await this.validateUniqueArticle(articleData.title, lang);
    }

    Object.assign(article, articleData);
    const updatedArticle = await this.articlesRepository.save(article);

    this.logger.log(`Article updated with slug: ${updatedArticle.slug}`);

    return this.getSingleArticle(updatedArticle.slug, lang);
  }

  async deleteArticle(
    userId: number,
    slug: string,
    i18n?: I18nContext,
  ): Promise<{ status: boolean }> {
    const lang = getLang(this.configService, i18n);

    const article = await this.validateArticle(slug, lang, userId);
    await this.articlesRepository.deleteEntity(article.id);

    this.logger.log(`Article deleted with slug: ${article.slug}`);

    return { status: true };
  }
}
