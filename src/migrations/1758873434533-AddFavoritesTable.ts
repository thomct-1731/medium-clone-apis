import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AddFavoritesTable1758873434533 implements MigrationInterface {
  name = 'AddFavoritesTable1758873434533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'article_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            length: '6',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            length: '6',
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_favorites_article_id',
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'articles',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_favorites_user_id',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          new TableIndex({
            name: 'idx_favorites_user_id_article_id',
            columnNames: ['user_id', 'article_id'],
            isUnique: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'favorites',
      'idx_favorites_user_id_article_id',
    );
    await queryRunner.dropForeignKey('favorites', 'fk_favorites_article_id');
    await queryRunner.dropForeignKey('favorites', 'fk_favorites_user_id');
    await queryRunner.dropTable('favorites');
  }
}
