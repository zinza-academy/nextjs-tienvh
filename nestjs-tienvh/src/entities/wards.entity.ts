import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Districts } from './districts.entity';
import { Address } from './address.entity';

@Entity()
export class Wards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => Districts, (district) => district.wards)
  @JoinColumn({ name: 'district_id' })
  district: Districts;

  @OneToMany(() => Address, (address) => address.ward)
  addresses: Address[];

}
