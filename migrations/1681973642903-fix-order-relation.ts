import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixOrderRelation1681973642903 implements MigrationInterface {
  name = 'FixOrderRelation1681973642903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP COLUMN \`createdAt\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD \`createdAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }
}
