import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

import { ArticlesService } from './articles.service';
import {
  CreateArticleRequest,
  UpdateArticleRequest,
} from './dto/article-request.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Article' })
  @ApiCreatedResponse({
    description: 'Article created successfully',
    type: ArticleResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  createArticle(
    @CurrentUser() userId: number,
    @Body() request: CreateArticleRequest,
    @I18n() i18n: I18nContext,
  ) {
    const { article: createArticleDto } = request;
    return this.articlesService.create(userId, createArticleDto, i18n);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get Article by Slug' })
  @ApiOkResponse({
    description: 'Article found',
    type: ArticleResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Article not found' })
  getArticle(@Param('slug') slug: string, @I18n() i18n: I18nContext) {
    return this.articlesService.getArticleBySlug(slug, i18n);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Article by Slug' })
  @ApiOkResponse({
    description: 'Article updated successfully',
    type: ArticleResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateArticle(
    @CurrentUser() userId: number,
    @Param('slug') slug: string,
    @Body() request: UpdateArticleRequest,
    @I18n() i18n: I18nContext,
  ) {
    const { article: updateArticleDto } = request;
    return this.articlesService.updateArticle(
      userId,
      slug,
      updateArticleDto,
      i18n,
    );
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Article by Slug' })
  @ApiOkResponse({ description: 'Article deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAuthGuard)
  deleteArticle(
    @CurrentUser() userId: number,
    @Param('slug') slug: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.articlesService.deleteArticle(userId, slug, i18n);
  }

  @Post(':slug/favorite')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Favorite Article' })
  @ApiOkResponse({
    description: 'Article favorited successfully',
    type: ArticleResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  @UseGuards(JwtAuthGuard)
  favoriteArticle(
    @CurrentUser() userId: number,
    @Param('slug') slug: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.articlesService.favoriteArticle(userId, slug, i18n);
  }

  @Delete(':slug/favorite')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfavorite Article' })
  @ApiOkResponse({
    description: 'Article unfavorited successfully',
    type: ArticleResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAuthGuard)
  unfavoriteArticle(
    @CurrentUser() userId: number,
    @Param('slug') slug: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.articlesService.unfavoriteArticle(userId, slug, i18n);
  }
}
