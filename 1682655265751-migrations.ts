import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1682655265751 implements MigrationInterface {
    name = 'Migrations1682655265751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`couponName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`couponName\``);
    }

}
