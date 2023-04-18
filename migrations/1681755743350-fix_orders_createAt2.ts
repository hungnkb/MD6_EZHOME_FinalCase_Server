import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrdersCreateAt21681755743350 implements MigrationInterface {
    name = 'FixOrdersCreateAt21681755743350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createAt\` \`createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createAt\` \`createAt\` datetime NULL`);
    }

}
