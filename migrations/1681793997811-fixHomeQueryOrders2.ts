import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixHomeQueryOrders21681793997811 implements MigrationInterface {
  name = 'FixHomeQueryOrders21681793997811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`home\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c30ca4b89e937d001e9c42317a3\` FOREIGN KEY (\`home\`) REFERENCES \`homes\`(\`idHome\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c30ca4b89e937d001e9c42317a3\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`home\``);
  }
}
