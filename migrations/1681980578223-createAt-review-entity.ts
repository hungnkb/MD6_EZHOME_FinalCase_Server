import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAtReviewEntity1681980578223 implements MigrationInterface {
    name = 'CreateAtReviewEntity1681980578223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD \`createdAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP COLUMN \`createdAt\``);
    }

}
