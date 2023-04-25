import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotificationTable1682406760372 implements MigrationInterface {
    name = 'AddNotificationTable1682406760372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`idNotification\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`message\` varchar(255) NOT NULL, \`dataUrl\` varchar(255) NOT NULL, \`status\` enum ('seen', 'unseen') NOT NULL DEFAULT 'unseen', \`user\` int NULL, PRIMARY KEY (\`idNotification\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_5fdec6c5f9c7e06de0e30386a82\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`idUser\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_5fdec6c5f9c7e06de0e30386a82\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
