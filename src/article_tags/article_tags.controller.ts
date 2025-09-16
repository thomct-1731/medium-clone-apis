import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleTagsService } from './article_tags.service';
import { CreateArticleTagDto } from './dto/create-article_tag.dto';
import { UpdateArticleTagDto } from './dto/update-article_tag.dto';

@Controller('article-tags')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Post()
  create(@Body() createArticleTagDto: CreateArticleTagDto) {
    return this.articleTagsService.create(createArticleTagDto);
  }

  @Get()
  findAll() {
    return this.articleTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleTagDto: UpdateArticleTagDto) {
    return this.articleTagsService.update(+id, updateArticleTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleTagsService.remove(+id);
  }
}
