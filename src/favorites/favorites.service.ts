import { Injectable } from '@nestjs/common';

import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async favoriteArticle(userId: number, articleId: number): Promise<void> {
    await this.favoritesRepository.createEntity({
      user_id: userId,
      article_id: articleId,
    });
  }

  async unfavoriteArticle(userId: number, articleId: number): Promise<void> {
    await this.favoritesRepository.delete({
      user_id: userId,
      article_id: articleId,
    });
  }

  async isArticleFavorited(
    userId: number,
    articleId: number,
  ): Promise<boolean> {
    const count = await this.favoritesRepository.count({
      where: { user_id: userId, article_id: articleId },
    });
    return count > 0;
  }
}
