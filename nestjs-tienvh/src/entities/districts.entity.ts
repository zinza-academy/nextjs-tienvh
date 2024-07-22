import { Provinces } from 'src/entities/provinces.entity';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wards } from './wards.entity';

@Entity()
export class Districts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => Provinces, (province) => province.districts)
  @JoinColumn({ name: 'province_id' })
  province: Provinces;

  @OneToMany(() => Wards, (ward) => ward.district)
  wards: Wards[];

  // @OneToMany(() => Address, (address) => address.district)
  // addresses: Address[];
}
