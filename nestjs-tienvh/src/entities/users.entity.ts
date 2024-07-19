import {
  Gender,
  getGenderEnum,
  getGenderString,
  getRoleEnum,
  getRoleString,
  Role,
} from 'src/common/enums/user.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Users {
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

  @Column({
    type: 'varchar',
    length: 10,
    transformer: {
      to: (value: Gender) => getGenderString(value),
      from: (value: string) => getGenderEnum(value),
    },
  })
  gender: Gender;

  @Column({ name: 'province_id', type: 'int' })
  province_id: number;

  @Column({ name: 'district_id', type: 'int' })
  district_id: number;

  @Column({ name: 'ward_id', type: 'int' })
  ward_id: number;

  @Column({
    name: 'role',
    type: 'varchar',
    transformer: {
      to: (value: Role) => getRoleString(value),
      from: (value: string) => getRoleEnum(value),
    },
  })
  role: Role;
}
