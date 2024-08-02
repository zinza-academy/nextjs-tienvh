import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVaccinesRegistrationEntity1722594852701 implements MigrationInterface {
    name = 'AddVaccinesRegistrationEntity1722594852701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` DROP FOREIGN KEY \`FK_66d0ee11b4f190d9686faf44bc7\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` CHANGE \`vaccine_id\` \`time_injection\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` ADD \`vaccine_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` DROP COLUMN \`time_injection\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` ADD \`time_injection\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` ADD CONSTRAINT \`FK_c01c1098bb1d0d8d58f84c116e4\` FOREIGN KEY (\`vaccine_id\`) REFERENCES \`vaccines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` DROP FOREIGN KEY \`FK_c01c1098bb1d0d8d58f84c116e4\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` DROP COLUMN \`time_injection\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` ADD \`time_injection\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` DROP COLUMN \`vaccine_id\``);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` CHANGE \`time_injection\` \`vaccine_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccines_registration\` ADD CONSTRAINT \`FK_66d0ee11b4f190d9686faf44bc7\` FOREIGN KEY (\`vaccine_id\`) REFERENCES \`vaccines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
