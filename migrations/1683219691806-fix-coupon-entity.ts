import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCouponEntity1683219691806 implements MigrationInterface {
    name = 'FixCouponEntity1683219691806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` CHANGE \`createDate\` \`createDate\` date NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` CHANGE \`createDate\` \`createDate\` date NOT NULL`);
    }

}
