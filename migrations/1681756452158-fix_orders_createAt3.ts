import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrdersCreateAt31681756452158 implements MigrationInterface {
    name = 'FixOrdersCreateAt31681756452158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`createAt\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
