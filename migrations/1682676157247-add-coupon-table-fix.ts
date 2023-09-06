import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCouponTableFix1682676157247 implements MigrationInterface {
  name = 'AddCouponTableFix1682676157247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`test\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`test\``);
  }
}
