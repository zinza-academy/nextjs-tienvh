import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetTokenTableUsers1722240798701 implements MigrationInterface {
    name = 'AddResetTokenTableUsers1722240798701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`resetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`resetTokenExpiry\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resetTokenExpiry\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resetToken\``);
    }

}
