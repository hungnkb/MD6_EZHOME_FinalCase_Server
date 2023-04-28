import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCouponTable1682653067022 implements MigrationInterface {
    name = 'AddCouponTable1682653067022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`coupons\` (\`idCoupon\` int NOT NULL AUTO_INCREMENT, \`createDate\` date NOT NULL, \`startDate\` date NOT NULL, \`endDate\` date NOT NULL, \`value\` int NOT NULL, \`idUser\` int NOT NULL, \`user\` int NULL, PRIMARY KEY (\`idCoupon\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD \`idCoupon\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`coupons\` ADD CONSTRAINT \`FK_609acd00b593903cd918ad7d088\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_d6aa0c0f753cae0515519234275\` FOREIGN KEY (\`idCoupon\`) REFERENCES \`coupons\`(\`idCoupon\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_d6aa0c0f753cae0515519234275\``);
        await queryRunner.query(`ALTER TABLE \`coupons\` DROP FOREIGN KEY \`FK_609acd00b593903cd918ad7d088\``);
        await queryRunner.query(`ALTER TABLE \`homes\` DROP COLUMN \`idCoupon\``);
        await queryRunner.query(`DROP TABLE \`coupons\``);
    }

}
