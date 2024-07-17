import { Gender, getGenderEnum, getGenderString } from 'src/common/enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  cmt: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar', length: 10,
    transformer: {
      to: (value: Gender) => getGenderString(value),
      from: (value: string) => getGenderEnum(value)
    }
  })
  gender: Gender;
  
  @Column({ name: "province_id", type: 'int' })
  province_id: number;

  @Column({ name: "district_id", type: 'int' })
  district_id: number;

  @Column({ name: "ward_id", type: 'int' })
  ward_id: number;
}
