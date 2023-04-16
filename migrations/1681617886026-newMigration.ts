import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1681617886026 implements MigrationInterface {
    name = 'NewMigration1681617886026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`idCategory\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, PRIMARY KEY (\`idCategory\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`idUser\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`password\` varchar(255) NULL, \`fullName\` varchar(255) NULL, \`address\` varchar(255) NULL, \`googleEmail\` varchar(255) NULL, \`image\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('admin', 'user', 'host') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), UNIQUE INDEX \`IDX_230274f20c1a8352408a75bb56\` (\`googleEmail\`), PRIMARY KEY (\`idUser\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`homeImages\` (\`idHomeImage\` int NOT NULL AUTO_INCREMENT, \`urlHomeImage\` varchar(255) NULL DEFAULT 'https://www.vinebrookhomes.com/img/default.png', \`idHome\` int NULL, PRIMARY KEY (\`idHomeImage\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`homes\` (\`idHome\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`bathrooms\` int NOT NULL, \`bedrooms\` int NOT NULL, \`description\` varchar(255) NULL, \`rate_stars\` int NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`idUser\` int NULL, \`idCategory\` int NULL, PRIMARY KEY (\`idHome\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reviews\` (\`idReview\` int NOT NULL AUTO_INCREMENT, \`rate_stars\` int NULL, \`contents\` varchar(255) NOT NULL, \`idHome\` int NULL, \`idUser\` int NULL, PRIMARY KEY (\`idReview\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`homeImages\` ADD CONSTRAINT \`FK_89970ff7944e060ef708bc71ad6\` FOREIGN KEY (\`idHome\`) REFERENCES \`homes\`(\`idHome\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_44bac1462746eec5da448715cbe\` FOREIGN KEY (\`idUser\`) REFERENCES \`users\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`homes\` ADD CONSTRAINT \`FK_23c51633bc6c73c5cb37f0ae70c\` FOREIGN KEY (\`idCategory\`) REFERENCES \`categories\`(\`idCategory\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_3120326d6c9153be5801c76224b\` FOREIGN KEY (\`idHome\`) REFERENCES \`homes\`(\`idHome\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_46f20815403fb4165d3d97dbc44\` FOREIGN KEY (\`idUser\`) REFERENCES \`users\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_46f20815403fb4165d3d97dbc44\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_3120326d6c9153be5801c76224b\``);
        await queryRunner.query(`ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_23c51633bc6c73c5cb37f0ae70c\``);
        await queryRunner.query(`ALTER TABLE \`homes\` DROP FOREIGN KEY \`FK_44bac1462746eec5da448715cbe\``);
        await queryRunner.query(`ALTER TABLE \`homeImages\` DROP FOREIGN KEY \`FK_89970ff7944e060ef708bc71ad6\``);
        await queryRunner.query(`DROP TABLE \`reviews\``);
        await queryRunner.query(`DROP TABLE \`homes\``);
        await queryRunner.query(`DROP TABLE \`homeImages\``);
        await queryRunner.query(`DROP INDEX \`IDX_230274f20c1a8352408a75bb56\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
