import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wards } from "./wards.entity";
import { VaccinesRegistration } from "./vaccines-registration.entity";
import { Vaccines } from "./vaccines.entity";

@Entity()
export class VaccinationSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  manager: string;

  @Column({ type: 'int'})
  table_number: number;

  @ManyToOne(() => Wards,(ward) => ward.users)
  @JoinColumn({ name: 'ward_id' , referencedColumnName: 'id'})
  ward: Wards;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(() => Vaccines,(vaccine) => vaccine.vaccinationSites)
  @JoinColumn({ name: 'vaccine_id' , referencedColumnName: 'id'})
  vaccine: Vaccines;
  
  @OneToMany(() => VaccinesRegistration, vaccinesRegistration => vaccinesRegistration.vaccinationSite)
  vaccinesRegistrations: VaccinesRegistration[];
}
