import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1682654037795 implements MigrationInterface {
    name = 'Migrations1682654037795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP COLUMN \`idUser\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD \`idUser\` int NOT NULL`);
    }

}
