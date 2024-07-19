import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Districts } from './districts.entity';
import { Address } from './address.entity';

@Entity()
export class Provinces {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Districts, (district) => district.province)
  districts: Districts[];

  @OneToMany(() => Address, (address) => address.province)
  addresses: Address[];

}
