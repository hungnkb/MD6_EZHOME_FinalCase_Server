import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsDeletedCoupon1683202426295 implements MigrationInterface {
  name = 'AddIsDeletedCoupon1683202426295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`isDeleted\` tinyint NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` DROP COLUMN \`isDeleted\``,
    );
  }
}
