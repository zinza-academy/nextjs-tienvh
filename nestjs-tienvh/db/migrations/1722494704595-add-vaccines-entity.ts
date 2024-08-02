import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVaccinesEntity1722494704595 implements MigrationInterface {
    name = 'AddVaccinesEntity1722494704595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccines\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`batch_number\` varchar(255) NOT NULL, \`manufacture_date\` date NOT NULL, \`expiration_date\` date NOT NULL, UNIQUE INDEX \`IDX_db01deab32ef5f6f38963e63ae\` (\`name\`), UNIQUE INDEX \`IDX_0bd408351bd8aebdee1c8ad032\` (\`batch_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0bd408351bd8aebdee1c8ad032\` ON \`vaccines\``);
        await queryRunner.query(`DROP INDEX \`IDX_db01deab32ef5f6f38963e63ae\` ON \`vaccines\``);
        await queryRunner.query(`DROP TABLE \`vaccines\``);
    }

}
