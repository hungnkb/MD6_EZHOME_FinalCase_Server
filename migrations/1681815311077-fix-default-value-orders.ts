import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixDefaultValueOrders1681815311077 implements MigrationInterface {
  name = 'FixDefaultValueOrders1681815311077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`status\` enum ('ongoing', 'done', 'cancelled') NOT NULL DEFAULT 'ongoing'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`status\` varchar(255) NOT NULL`,
    );
  }
}
