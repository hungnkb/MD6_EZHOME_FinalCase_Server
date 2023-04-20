import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAtColumnReviews1681955341491 implements MigrationInterface {
    name = 'CreatedAtColumnReviews1681955341491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD \`createdAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP COLUMN \`createdAt\``);
    }

}
