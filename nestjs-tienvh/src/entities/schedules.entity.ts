import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VaccinesRegistration } from "./vaccines-registration.entity";
import { getTimeSlotEnum, getTimeSlotString, TimeSlot } from "common/enums/time-slot.enum";

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  injection_date: Date;

  @Column({
    type: 'varchar',
    length: 50,
    transformer: {
      to: (value: TimeSlot) => getTimeSlotString(value),
      from: (value: string) => getTimeSlotEnum(value),
    },
  })
  time_slot: TimeSlot;
  
  @OneToMany(() => VaccinesRegistration, vaccinesRegistration => vaccinesRegistration.schedule)
  vaccinesRegistrations: VaccinesRegistration[];
}
