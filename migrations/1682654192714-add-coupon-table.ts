import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCouponTable1682654192714 implements MigrationInterface {
  name = 'AddCouponTable1682654192714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`idUser\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`idUser\` int NOT NULL`,
    );
  }
}
