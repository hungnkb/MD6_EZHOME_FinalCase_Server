import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCouponCascade1683192218495 implements MigrationInterface {
    name = 'FixCouponCascade1683192218495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP FOREIGN KEY \`FK_609acd00b593903cd918ad7d088\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`test\``);
        await queryRunner.query(`ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_d6aa0c0f753cae0515519234275\``);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD UNIQUE INDEX \`IDX_d6aa0c0f753cae051551923427\` (\`idCoupon\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d6aa0c0f753cae051551923427\` ON \`homes\` (\`idCoupon\`)`);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD CONSTRAINT \`FK_609acd00b593903cd918ad7d088\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_d6aa0c0f753cae0515519234275\` FOREIGN KEY (\`idCoupon\`) REFERENCES \`coupons\`(\`idCoupon\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_d6aa0c0f753cae0515519234275\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP FOREIGN KEY \`FK_609acd00b593903cd918ad7d088\``);
        await queryRunner.query(`DROP INDEX \`REL_d6aa0c0f753cae051551923427\` ON \`homes\``);
        await queryRunner.query(`ALTER TABLE \`homes\` DROP INDEX \`IDX_d6aa0c0f753cae051551923427\``);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_d6aa0c0f753cae0515519234275\` FOREIGN KEY (\`idCoupon\`) REFERENCES \`coupons\`(\`idCoupon\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`test\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD CONSTRAINT \`FK_609acd00b593903cd918ad7d088\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
