import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VaccinesRegistration } from "./vaccines-registration.entity";

@Entity()
export class Jobs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @OneToMany(() => VaccinesRegistration, vaccinesRegistration => vaccinesRegistration.job)
  vaccinesRegistrations: VaccinesRegistration[];
}
