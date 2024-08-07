import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVaccinesRegistrationEntity1722997519750 implements MigrationInterface {
    name = 'AddVaccinesRegistrationEntity1722997519750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` ADD \`status\` varchar(10) NOT NULL`);
    }

}
