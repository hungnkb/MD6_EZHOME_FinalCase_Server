import { MigrationInterface, QueryRunner } from "typeorm";

export class FulltextHomeTrue1681979608614 implements MigrationInterface {
    name = 'FulltextHomeTrue1681979608614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_ede2cfa8a2200525caf44254d1\` ON \`homes\` (\`bathrooms\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ede2cfa8a2200525caf44254d1\` ON \`homes\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD \`createdAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
