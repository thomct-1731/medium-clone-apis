import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCommentTable1758014756469 implements MigrationInterface {
  name = 'CreateCommentTable1758014756469';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'body',
            type: 'text',
            isNullable: false,
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
          {
            name: 'article_id',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_comment_author_id',
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
          },
          {
            name: 'fk_comment_article_id',
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'articles',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          new TableIndex({
            name: 'idx_comments_author_id',
            columnNames: ['author_id'],
          }),
          new TableIndex({
            name: 'idx_comments_article_id',
            columnNames: ['article_id'],
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'fk_comment_author_id');
    await queryRunner.dropForeignKey('comments', 'fk_comment_article_id');
    await queryRunner.dropTable('comments');
  }
}
