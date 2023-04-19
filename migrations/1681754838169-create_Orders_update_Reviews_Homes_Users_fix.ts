import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersUpdateReviewsHomesUsersFix1681754838169
  implements MigrationInterface
{
  name = 'CreateOrdersUpdateReviewsHomesUsersFix1681754838169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`checkin\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`checkin\` date NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`checkout\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`checkout\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`createAt\` \`createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`checkout\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`checkout\` datetime NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`checkin\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`checkin\` datetime NOT NULL`,
    );
  }
}
