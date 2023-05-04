import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCouponEntity1683220291918 implements MigrationInterface {
    name = 'FixCouponEntity1683220291918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` CHANGE \`createDate\` \`createAt\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`createAt\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupons\` CHANGE \`createAt\` \`createDate\` date NOT NULL`);
    }

}
