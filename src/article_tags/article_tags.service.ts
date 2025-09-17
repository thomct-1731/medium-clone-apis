import { Injectable } from '@nestjs/common';
import { CreateArticleTagDto } from './dto/create-article_tag.dto';
import { UpdateArticleTagDto } from './dto/update-article_tag.dto';

@Injectable()
export class ArticleTagsService {
  create(createArticleTagDto: CreateArticleTagDto) {
    return 'This action adds a new articleTag';
  }

  findAll() {
    return `This action returns all articleTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleTag`;
  }

  update(id: number, updateArticleTagDto: UpdateArticleTagDto) {
    return `This action updates a #${id} articleTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleTag`;
  }
}
