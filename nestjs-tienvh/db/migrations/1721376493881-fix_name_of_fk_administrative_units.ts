import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNameOfFkAdministrativeUnits1721376493881 implements MigrationInterface {
    name = 'FixNameOfFkAdministrativeUnits1721376493881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_36a5ea1bf9f1a45fc696628bda2\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_6b08d352c02976faa2b4b2933c3\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_89e09cf52a27eec4a04378bbdda\``);
        await queryRunner.query(`ALTER TABLE \`wards\` DROP FOREIGN KEY \`FK_812309cfc78b10b505a6cd44df5\``);
        await queryRunner.query(`ALTER TABLE \`wards\` CHANGE \`districtId\` \`district_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`districtId\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`provinceId\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`wardId\``);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`province_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`district_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`ward_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_4f4f5db6965d8b7efcea357f330\` FOREIGN KEY (\`province_id\`) REFERENCES \`provinces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_64989ed42a39bc4b40d51d13e0e\` FOREIGN KEY (\`district_id\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_e5ad8623648a0deb50ddf4e9550\` FOREIGN KEY (\`ward_id\`) REFERENCES \`wards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wards\` ADD CONSTRAINT \`FK_3d1ef92876a28d10ac2d3fe766b\` FOREIGN KEY (\`district_id\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wards\` DROP FOREIGN KEY \`FK_3d1ef92876a28d10ac2d3fe766b\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_e5ad8623648a0deb50ddf4e9550\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_64989ed42a39bc4b40d51d13e0e\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_4f4f5db6965d8b7efcea357f330\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`ward_id\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`district_id\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`province_id\``);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`wardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`provinceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`districtId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`wards\` CHANGE \`district_id\` \`districtId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`wards\` ADD CONSTRAINT \`FK_812309cfc78b10b505a6cd44df5\` FOREIGN KEY (\`districtId\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_89e09cf52a27eec4a04378bbdda\` FOREIGN KEY (\`districtId\`) REFERENCES \`districts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_6b08d352c02976faa2b4b2933c3\` FOREIGN KEY (\`provinceId\`) REFERENCES \`provinces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_36a5ea1bf9f1a45fc696628bda2\` FOREIGN KEY (\`wardId\`) REFERENCES \`wards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
