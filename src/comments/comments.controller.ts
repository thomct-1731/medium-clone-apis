import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
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

import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { CommentsService } from 'src/comments/comments.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateCommentRequest } from 'src/comments/dto/comment-request.dto';
import {
  CommentResponseDto,
  CommentsListResponseDto,
} from './dto/comment-response.dto';

@ApiTags('comments')
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add Comments to an Article' })
  @ApiCreatedResponse({
    description: 'Comment created successfully',
    type: CommentResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  createComment(
    @CurrentUser() userId: number,
    @Param('slug') slug: string,
    @Body() request: CreateCommentRequest,
    @I18n() i18n: I18nContext,
  ) {
    const { comment: createCommentDto } = request;
    return this.commentsService.create(userId, slug, createCommentDto, i18n);
  }

  @Get()
  @ApiOperation({ summary: 'Get Comments from an Article' })
  @ApiOkResponse({
    description: 'Comments retrieved successfully',
    type: CommentsListResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Article Not Found' })
  getComments(@Param('slug') slug: string, @I18n() i18n: I18nContext) {
    return this.commentsService.getAllByArticle(slug, i18n);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Comment' })
  @ApiOkResponse({ description: 'Comment deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Article/Comment Not Found' })
  @UseGuards(JwtAuthGuard)
  deleteComment(
    @CurrentUser() userId: number,
    @Param('slug') slug: string,
    @Param('id') id: number,
    @I18n() i18n: I18nContext,
  ) {
    return this.commentsService.deleteComment(userId, slug, id, i18n);
  }
}
