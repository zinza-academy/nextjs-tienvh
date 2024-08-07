import { VaccinesRegistration } from "entities/vaccines-registration.entity";
import { RegistrationStatus } from "common/enums/vaccine-registration.enum";
import { UpdateVaccinesRegistrationDto, VaccinesRegistrationDto } from "../dto/registration.dto";

export class VaccinesRegistrationMapper {
  static toCreateEntity(dto: VaccinesRegistrationDto): VaccinesRegistration {
    const entity = new VaccinesRegistration();
    entity.bhyt = dto.bhyt;
    entity.work_place = dto.work_place;
    entity.status = RegistrationStatus.PENDING;
    entity.vaccinationSite = { id: dto.vaccination_site_id } as any;
    entity.user = { id: dto.user_id } as any;
    entity.schedule = { id: dto.schedule_id } as any;
    entity.job = { id: dto.job_id } as any;
    entity.priorityGroup = { id: dto.priority_group_id } as any;
    return entity;
  }

  static toUpdateEntity(existingRegistration: VaccinesRegistration, dto: UpdateVaccinesRegistrationDto): VaccinesRegistration {
    if (dto.bhyt !== undefined) existingRegistration.bhyt = dto.bhyt;
    if (dto.work_place !== undefined) existingRegistration.work_place = dto.work_place;
    if (dto.status !== undefined) existingRegistration.status = dto.status;
    if (dto.time_inject !== undefined) existingRegistration.time_injection = dto.time_inject;
    if (dto.vaccination_site_id !== undefined) existingRegistration.vaccinationSite = { id: dto.vaccination_site_id } as any;
    if (dto.user_id !== undefined) existingRegistration.user = { id: dto.user_id } as any;
    if (dto.schedule_id !== undefined) existingRegistration.schedule = { id: dto.schedule_id } as any;
    if (dto.job_id !== undefined) existingRegistration.job = { id: dto.job_id } as any;
    if (dto.priority_group_id !== undefined) existingRegistration.priorityGroup = { id: dto.priority_group_id } as any;
    return existingRegistration;
  }

  static toDto(entity: VaccinesRegistration): VaccinesRegistrationDto {
    const dto = new VaccinesRegistrationDto();
    dto.bhyt = entity.bhyt;
    dto.work_place = entity.work_place;
    dto.user_id = entity.user.id;
    dto.vaccination_site_id = entity.vaccinationSite.id;
    dto.priority_group_id = entity.priorityGroup.id;
    dto.job_id = entity.job.id;
    dto.schedule_id = entity.schedule.id;
    return dto;
  }

  static toDetailDto(entity: VaccinesRegistration): any {
    return {
      id: entity.id,
      bhyt: entity.bhyt,
      work_place: entity.work_place,
      status: entity.status,
      time_injection: entity.time_injection,
      user_id: entity.user.id,
      vaccination_site_id: entity.vaccinationSite.id,
      priority_group_id: entity.priorityGroup.id,
      job_id: entity.job.id,
      schedule_id: entity.schedule.id
    };
  }
}
