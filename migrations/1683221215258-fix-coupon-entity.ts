import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCouponEntity1683221215258 implements MigrationInterface {
  name = 'FixCouponEntity1683221215258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` CHANGE \`createDate\` \`createAt\` date NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`createAt\` varchar(255) NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`createAt\``);
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`createAt\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`coupons\` CHANGE \`createAt\` \`createDate\` date NOT NULL`,
    );
  }
}
