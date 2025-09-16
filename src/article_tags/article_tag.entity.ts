import {
  Entity,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('article_tags')
@Index('idx_article_tags_tag_id_article_id', ['tag_id', 'article_id'])
export class ArticleTag {
  @PrimaryColumn()
  article_id: number;

  @PrimaryColumn()
  tag_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
