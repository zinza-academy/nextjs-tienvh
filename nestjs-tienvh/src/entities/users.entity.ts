
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wards } from './wards.entity';
import { Gender, getGenderEnum, getGenderString, getRoleEnum, getRoleString, Role } from 'common/enums/user.enum';
import { VaccinesRegistration } from './vaccines-registration.entity';
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

  @Column({
    name: 'role',
    type: 'varchar',
    transformer: {
      to: (value: Role) => getRoleString(value),
      from: (value: string) => getRoleEnum(value),
    },
  })
  role: Role;
  @ManyToOne(() => Wards,(ward) => ward.users)
  @JoinColumn({ name: 'ward_id' })
  ward: Wards;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiry: Date;

  @OneToMany(() => VaccinesRegistration, vaccinesRegistration => vaccinesRegistration.user)
  vaccinesRegistrations: VaccinesRegistration[];
}
