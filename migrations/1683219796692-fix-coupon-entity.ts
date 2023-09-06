import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCouponEntity1683219796692 implements MigrationInterface {
  name = 'FixCouponEntity1683219796692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` DROP COLUMN \`createDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`createDate\` datetime NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` DROP COLUMN \`createDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`createDate\` date NOT NULL`,
    );
  }
}
