import { VaccinationSite } from 'entities/vaccination-site.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from './users.entity';
import { Vaccines } from "./vaccines.entity";
import { Schedules } from './schedules.entity';
import { Jobs } from './jobs.entity';
import { PriorityGroups } from './priority_groups.entity';
import { getRegistrationStatusEnum, getRegistrationStatusString, RegistrationStatus } from 'common/enums/vaccine-registration.enum';

@Entity()
export class VaccinesRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  bhyt: string;

  @Column({ type: 'varchar', length: 255 })
  work_place: string;

  @Column({ type: 'varchar',
    length: 255,
    transformer: {
      to: (value: RegistrationStatus) =>  getRegistrationStatusString(value),
      from: (value: string) => getRegistrationStatusEnum(value),
    }, })
  status: RegistrationStatus;

  @Column({ type: 'datetime', nullable: true })
  time_injection: Date;

  @ManyToOne(() => VaccinationSite,(vaccinationSite) => vaccinationSite.vaccinesRegistrations)
  @JoinColumn({ name: 'vaccination_site_id' , referencedColumnName: 'id'})
  vaccinationSite: VaccinationSite;

  @ManyToOne(() => Users,(user) => user.vaccinesRegistrations)
  @JoinColumn({ name: 'user_id' , referencedColumnName: 'id'})
  user: Users;

  @ManyToOne(() => Schedules,(schedule) => schedule.vaccinesRegistrations)
  @JoinColumn({ name: 'schedule_id' , referencedColumnName: 'id'})
  schedule: Schedules;

  @ManyToOne(() => Jobs,(job) => job.vaccinesRegistrations)
  @JoinColumn({ name: 'job_id' , referencedColumnName: 'id'})
  job: Jobs;

  @ManyToOne(() => PriorityGroups,(priorityGroups) => priorityGroups.vaccinesRegistrations)
  @JoinColumn({ name: 'priority_group_id' , referencedColumnName: 'id'})
  priorityGroup: PriorityGroups;
}
