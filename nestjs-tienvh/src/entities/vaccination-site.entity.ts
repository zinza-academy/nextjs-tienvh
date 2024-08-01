import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wards } from "./wards.entity";

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
}
