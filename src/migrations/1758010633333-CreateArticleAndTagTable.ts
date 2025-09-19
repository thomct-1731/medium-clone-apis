import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateArticleAndTagTable1758010633333
  implements MigrationInterface
{
  name = 'CreateArticleAndTagTable1758010633333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'body',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
            default: `'DRAFT'`,
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
          {
            name: 'author_id',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_article_author_id',
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
          },
        ],
        indices: [
          new TableIndex({
            name: 'idx_articles_slug',
            columnNames: ['slug'],
          }),
          new TableIndex({
            name: 'idx_articles_author_id',
            columnNames: ['author_id'],
          }),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
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
        indices: [
          new TableIndex({
            name: 'idx_tags_name',
            columnNames: ['name'],
          }),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'article_tags',
        columns: [
          {
            name: 'article_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'tag_id',
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
            name: 'fk_article_tags_article_id',
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'articles',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_article_tags_tag_id',
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          new TableIndex({
            name: 'idx_article_tags_tag_id_article_id',
            columnNames: ['tag_id', 'article_id'],
            isUnique: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'article_tags',
      'idx_article_tags_tag_id_article_id',
    );
    await queryRunner.dropForeignKey('articles', 'fk_article_user_id');
    await queryRunner.dropForeignKey(
      'article_tags',
      'fk_article_tags_article_id',
    );
    await queryRunner.dropForeignKey('article_tags', 'fk_article_tags_tag_id');
    await queryRunner.dropTable('article_tags');
    await queryRunner.dropTable('tags');
    await queryRunner.dropTable('articles');
  }
}
