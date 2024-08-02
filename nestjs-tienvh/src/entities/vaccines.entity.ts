import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VaccinationSite } from "./vaccination-site.entity";

@Entity()
export class Vaccines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  producer: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  batch_number: string;

  @Column({ type: 'date' })
  manufacture_date: Date;

  @Column({ type: 'date' })
  expiration_date: Date;

  @OneToMany(() => VaccinationSite, vaccinationSite => vaccinationSite.vaccine)
  vaccinationSites: VaccinationSite[];
}
