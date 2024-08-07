import { ApiResponse, createResponse } from './../../common/utils/response.util';
import { HttpStatus, Injectable, BadRequestException, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VaccinesRegistration } from "entities/vaccines-registration.entity";
import { Repository } from "typeorm";
import { VaccinesRegistrationDto, UpdateVaccinesRegistrationDto } from "./dto/registration.dto";
import { RegistrationStatus } from 'common/enums/vaccine-registration.enum';
import { Users } from 'entities/users.entity';
import { VaccinationSite } from 'entities/vaccination-site.entity';
import { PriorityGroups } from 'entities/priority_groups.entity';
import { Jobs } from 'entities/jobs.entity';
import { Schedules } from 'entities/schedules.entity';
import { PaginationDto } from 'modules/vaccination-sites/dto/vaccination-sites.dto';
import { VaccinesRegistrationMapper } from './mapper/registration.mapper';

@Injectable()
export class VaccinesRegistrationService {
  constructor(
    @InjectRepository(VaccinesRegistration)
    private registrationRepository: Repository<VaccinesRegistration>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(VaccinationSite)
    private vaccinationSiteRepository: Repository<VaccinationSite>,
    @InjectRepository(PriorityGroups)
    private priorityGroupsRepository: Repository<PriorityGroups>,
    @InjectRepository(Jobs)
    private jobsRepository: Repository<Jobs>,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async create(createDto: VaccinesRegistrationDto): Promise<ApiResponse<VaccinesRegistration>> {
    const bhytExists = await this.checkBhytExists(createDto.bhyt);
    if (bhytExists) {
      throw new ConflictException('Registration  with this bhyt already exists');
    }
    await this.validateRelatedEntities(createDto);
    const registration = VaccinesRegistrationMapper.toCreateEntity(createDto);
    const savedRegistration = await this.registrationRepository.save(registration);
    
    return createResponse(VaccinesRegistrationMapper.toDetailDto(savedRegistration), 'Vaccine Registration created successfully', HttpStatus.CREATED);
  }

  async findAll(dto: PaginationDto): Promise<[VaccinesRegistration[], number]> {
    const page = dto.page || 1;
    const pageSize = dto.pageSize || 10;
    
    const [registrations, total] = await this.registrationRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['user', 'vaccinationSite', 'schedule', 'job', 'priorityGroup'],
    });
    const registrationDtos = registrations.map(VaccinesRegistrationMapper.toDetailDto);
    return [registrationDtos, total];
  }

  async findByUserId(userId: number, dto: PaginationDto): Promise<[VaccinesRegistration[],number]> {
    const page = dto.page || 1;
    const pageSize = dto.pageSize || 10;

    const [registrations, total] = await this.registrationRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['user','vaccinationSite', 'schedule', 'job', 'priorityGroup'],
    });
    const registrationDtos = registrations.map(VaccinesRegistrationMapper.toDetailDto);
    return [registrationDtos, total];
  }

  async findOne(id: number): Promise<ApiResponse<VaccinesRegistration>> {
    const registration = await this.registrationRepository.findOne({
      where: {id},
      relations: ['user', 'vaccinationSite', 'schedule', 'job', 'priorityGroup'],
    });
    if (!registration) {
      throw new NotFoundException('Vaccine Registration not found');
    }
    const registrationDto = VaccinesRegistrationMapper.toDetailDto(registration);
    return createResponse(registrationDto, 'Vaccine Registration retrieved successfully', HttpStatus.OK);
  }

  async update(id: number, updateDto: UpdateVaccinesRegistrationDto): Promise<ApiResponse<VaccinesRegistration>> {
    const registration = await this.registrationRepository.findOne({where: {id}});
    if (!registration) {
      throw new NotFoundException('Vaccine Registration not found');
    }

    if (updateDto.status && updateDto.status !== registration.status) {
      throw new BadRequestException('Cannot change status through update method');
    }

    if (updateDto.bhyt) {
      const bhytExists = await this.checkBhytExists(updateDto.bhyt);
      if (bhytExists) {
        throw new ConflictException('Registration  with this bhyt already exists');
      }
    }
    
    await this.validateRelatedEntities(updateDto);
    const updatedRegistration = VaccinesRegistrationMapper.toUpdateEntity(registration, updateDto);
    const savedRegistration = await this.registrationRepository.save(updatedRegistration);
    return createResponse(savedRegistration, 'Vaccine Registration updated successfully', HttpStatus.OK);
  }
  
  async approveRegistration(id: number): Promise<ApiResponse<VaccinesRegistration>> {
    const registration = await this.registrationRepository.findOneBy({id});
    if (!registration) {
      throw new NotFoundException('Vaccine Registration not found');
    }
    if (registration.status !== RegistrationStatus.PENDING) {
      throw new BadRequestException('Chỉ có thể duyệt đăng ký đang ở trạng thái chờ duyệt');
    }
    registration.status = RegistrationStatus.APPROVED;
    const approvedRegistration = await this.registrationRepository.save(registration);
    return createResponse(approvedRegistration, 'Vaccine Registration approved successfully', HttpStatus.OK);
  }

  async markAsInjected(id: number): Promise<ApiResponse<VaccinesRegistration>> {
    const registration = await this.registrationRepository.findOne({where: {id}});
    if (!registration) {
      throw new NotFoundException('Vaccine Registration not found');
    }
    if (registration.status !== RegistrationStatus.APPROVED) {
      throw new BadRequestException('Chỉ có thể đánh dấu đã tiêm cho đăng ký đã được duyệt');
    }
    registration.status = RegistrationStatus.COMPLETED;
    registration.time_injection = new Date();
    const injectedRegistration = await this.registrationRepository.save(registration);
    return createResponse(injectedRegistration, 'Vaccine Registration marked as injected successfully', HttpStatus.OK);
  }

  private async validateRelatedEntities(dto: Partial<VaccinesRegistrationDto>): Promise<void> {
    if (dto.user_id) {
      const user = await this.usersRepository.findOne({ where: { id: dto.user_id } });
      if (!user) {
        throw new BadRequestException('User not found');
      }
    }
  
    if (dto.vaccination_site_id) {
      const vaccinationSite = await this.vaccinationSiteRepository.findOne({ where: { id: dto.vaccination_site_id } });
      if (!vaccinationSite) {
        throw new BadRequestException('Vaccination Site not found');
      }
    }
  
    if (dto.priority_group_id) {
      const priorityGroup = await this.priorityGroupsRepository.findOne({ where: { id: dto.priority_group_id } });
      if (!priorityGroup) {
        throw new BadRequestException('Priority Group not found');
      }
    }
  
    if (dto.job_id) {
      const job = await this.jobsRepository.findOne({ where: { id: dto.job_id } });
      if (!job) {
        throw new BadRequestException('Job not found');
      }
    }
  
    if (dto.schedule_id) {
      const schedule = await this.schedulesRepository.findOne({ where: { id: dto.schedule_id } });
      if (!schedule) {
        throw new BadRequestException('Schedule not found');
      }
    }
  }

  async checkBhytExists(bhyt: string): Promise<boolean> {
    const registration = await this.registrationRepository.findOne({
      where: { bhyt: bhyt }
    });
    return !!registration;
  }
}
