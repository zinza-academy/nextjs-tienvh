import { Entity, PrimaryGeneratedColumn, Column, Table } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cmt: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  gender: string;

  @Column({name:"province_id"})
  province: number;

  @Column({name:"district_id"})
  district: number;

  @Column({name:"ward_id"})
  ward: number;
  
}
