import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VaccinesRegistration } from "./vaccines-registration.entity";

@Entity()
export class PriorityGroups {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'varchar', length: 255})
  description: string;

  @OneToMany(() => VaccinesRegistration, vaccinesRegistration => vaccinesRegistration.priorityGroup)
  vaccinesRegistrations: VaccinesRegistration[];
}
