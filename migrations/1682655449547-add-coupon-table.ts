import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCouponTable1682655449547 implements MigrationInterface {
  name = 'AddCouponTable1682655449547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`couponName\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` DROP COLUMN \`couponName\``,
    );
  }
}
