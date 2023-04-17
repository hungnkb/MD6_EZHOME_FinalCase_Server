import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersUpdateReviewsHomesUsers1681748278085 implements MigrationInterface {
    name = 'CreateOrdersUpdateReviewsHomesUsers1681748278085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`idOrder\` int NOT NULL AUTO_INCREMENT, \`checkin\` datetime NOT NULL, \`checkout\` datetime NOT NULL, \`createAt\` datetime NOT NULL, \`charged\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`user\` int NULL, \`home\` int NULL, PRIMARY KEY (\`idOrder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_3385fd4a67d8e132499eb00aa6b\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c30ca4b89e937d001e9c42317a3\` FOREIGN KEY (\`home\`) REFERENCES \`homes\`(\`idHome\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c30ca4b89e937d001e9c42317a3\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_3385fd4a67d8e132499eb00aa6b\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
