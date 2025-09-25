import { ApiProperty } from '@nestjs/swagger';
import { Type, Expose, Transform } from 'class-transformer';

import { ProfileDataDto } from 'src/users/dto/user-reponse.dto';
import { Tag } from 'src/tags/tag.entity';

export class ArticleDataDto {
  @ApiProperty({ example: 'how-to-train-your-dragon' })
  @Expose()
  slug: string;

  @ApiProperty({ example: 'How to train your dragon' })
  @Expose()
  title: string;

  @ApiProperty({ example: 'Ever wonder how?' })
  @Expose()
  description: string;

  @ApiProperty({ example: 'You have to believe' })
  @Expose()
  body: string;

  @ApiProperty({ example: ['dragons', 'training'] })
  @Expose()
  @Transform(
    ({ obj }: { obj: { tagList?: Array<string> | Tag[] } }) =>
      obj.tagList?.map((tag: string | Tag) =>
        typeof tag === 'string' ? tag : tag.name,
      ) || [],
  )
  tagList: string[];

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ example: false })
  @Expose()
  favorited: boolean;

  @ApiProperty({ example: 0 })
  @Expose()
  favoritesCount: number;

  @ApiProperty({ type: ProfileDataDto })
  @Expose()
  @Type(() => ProfileDataDto)
  author: ProfileDataDto;
}

export class ArticleResponseDto {
  @ApiProperty({ type: ArticleDataDto })
  @Expose()
  @Type(() => ArticleDataDto)
  article: ArticleDataDto;
}
