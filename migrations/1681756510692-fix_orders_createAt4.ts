import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrdersCreateAt41681756510692 implements MigrationInterface {
    name = 'FixOrdersCreateAt41681756510692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`createAt\``);
    }

}
