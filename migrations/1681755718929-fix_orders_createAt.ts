import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrdersCreateAt1681755718929 implements MigrationInterface {
    name = 'FixOrdersCreateAt1681755718929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createAt\` \`createAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createAt\` \`createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
