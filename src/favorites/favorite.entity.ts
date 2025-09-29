import {
  Entity,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('favorites')
@Index('idx_favorites_user_id_article_id', ['user_id', 'article_id'])
export class Favorite {
  @PrimaryColumn()
  article_id: number;

  @PrimaryColumn()
  user_id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
