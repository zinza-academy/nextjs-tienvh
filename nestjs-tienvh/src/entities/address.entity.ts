import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Districts } from './districts.entity';
import { Provinces } from './provinces.entity';
import { Wards } from './wards.entity';


// @Entity()
// export class Address {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 50 })
//   specific_address: string;

//   // @ManyToOne(() => Provinces, (province) => province.addresses)
//   // @JoinColumn({ name: 'province_id' })
//   // province: Provinces;

//   // @ManyToOne(() => Districts, (district) => district.addresses)
//   // @JoinColumn({ name: 'district_id' })
//   // district: Districts;

//   // @ManyToOne(() => Wards, (ward) => ward.addresses)
//   // @JoinColumn({ name: 'ward_id' })
//   // ward: Wards;

// }
