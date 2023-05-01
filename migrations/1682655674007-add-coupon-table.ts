import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCouponTable1682655674007 implements MigrationInterface {
    name = 'AddCouponTable1682655674007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` CHANGE \`couponName\` \`couponname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`couponname\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`couponname\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`couponname\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`couponname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`coupons\` CHANGE \`couponname\` \`couponName\` varchar(255) NOT NULL`);
    }

}
