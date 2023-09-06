import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCouponCascade1683193005207 implements MigrationInterface {
  name = 'FixCouponCascade1683193005207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_d6aa0c0f753cae0515519234275\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_d6aa0c0f753cae0515519234275\` FOREIGN KEY (\`idCoupon\`) REFERENCES \`coupons\`(\`idCoupon\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_d6aa0c0f753cae0515519234275\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_d6aa0c0f753cae0515519234275\` FOREIGN KEY (\`idCoupon\`) REFERENCES \`coupons\`(\`idCoupon\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
