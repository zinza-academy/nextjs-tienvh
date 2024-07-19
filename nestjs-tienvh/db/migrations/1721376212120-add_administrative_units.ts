import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdministrativeUnits1721376212120 implements MigrationInterface {
    name = 'AddAdministrativeUnits1721376212120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`specific_address\` varchar(50) NOT NULL, \`provinceId\` int NULL, \`districtId\` int NULL, \`wardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provinces\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`districts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`provinceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`districtId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_6b08d352c02976faa2b4b2933c3\` FOREIGN KEY (\`provinceId\`) REFERENCES \`provinces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_89e09cf52a27eec4a04378bbdda\` FOREIGN KEY (\`districtId\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_36a5ea1bf9f1a45fc696628bda2\` FOREIGN KEY (\`wardId\`) REFERENCES \`wards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`districts\` ADD CONSTRAINT \`FK_5816de08e361ad9cab115bd6bf9\` FOREIGN KEY (\`provinceId\`) REFERENCES \`provinces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wards\` ADD CONSTRAINT \`FK_812309cfc78b10b505a6cd44df5\` FOREIGN KEY (\`districtId\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wards\` DROP FOREIGN KEY \`FK_812309cfc78b10b505a6cd44df5\``);
        await queryRunner.query(`ALTER TABLE \`districts\` DROP FOREIGN KEY \`FK_5816de08e361ad9cab115bd6bf9\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_36a5ea1bf9f1a45fc696628bda2\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_89e09cf52a27eec4a04378bbdda\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_6b08d352c02976faa2b4b2933c3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`DROP TABLE \`wards\``);
        await queryRunner.query(`DROP TABLE \`districts\``);
        await queryRunner.query(`DROP TABLE \`provinces\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`users\` (\`email\`)`);
    }

}
