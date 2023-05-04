import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCouponCascade1683192661710 implements MigrationInterface {
    name = 'FixCouponCascade1683192661710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_609acd00b593903cd918ad7d088\` ON \`coupons\``);
        await queryRunner.query(`DROP INDEX \`FK_d6aa0c0f753cae0515519234275\` ON \`homes\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD CONSTRAINT \`FK_609acd00b593903cd918ad7d088\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_d6aa0c0f753cae0515519234275\` FOREIGN KEY (\`idCoupon\`) REFERENCES \`coupons\`(\`idCoupon\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_d6aa0c0f753cae0515519234275\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP FOREIGN KEY \`FK_609acd00b593903cd918ad7d088\``);
        await queryRunner.query(`CREATE INDEX \`FK_d6aa0c0f753cae0515519234275\` ON \`homes\` (\`idCoupon\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_609acd00b593903cd918ad7d088\` ON \`coupons\` (\`user\`)`);
    }

}
