import { ConflictException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse, createResponse } from "common/utils/response.util";
import { VaccinationSite } from "entities/vaccination-site.entity";
import { Wards } from "entities/wards.entity";
import { Like, Repository } from "typeorm";
import { CreateVaccinationSiteDto, FindVaccinationSiteByWardIdDto, PaginationDto, SearchVaccinationSiteDto, UpdateVaccinationSiteDto } from "./dto/vaccination-sites.dto";
import { Vaccines } from "entities/vaccines.entity";
@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteRepository: Repository<VaccinationSite>,
    @InjectRepository(Wards)
    private wardRepository: Repository<Wards>,
    @InjectRepository(Vaccines)
    private vaccinesRepository: Repository<Vaccines>
  ) {}

  async findAll(dto: PaginationDto): Promise<[VaccinationSite[], number]> {
    const page = dto.page || 1;
    const pageSize = dto.pageSize || 10;
    const [vaccinationSites, total] = await this.vaccinationSiteRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    return [vaccinationSites, total];
  }

  async findByWardId(dto: FindVaccinationSiteByWardIdDto ): Promise<[VaccinationSite[], number]> {
    const page = dto.page || 1;
    const pageSize = dto.pageSize || 10;
    const [vaccinationSites, total] = await this.vaccinationSiteRepository.findAndCount({
      where: { ward: { id: dto.ward_id } },
      relations: ['ward', 'ward.district', 'ward.district.province'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  
    if (vaccinationSites.length === 0) {
      throw new NotFoundException(`No vaccination sites found for ward ID ${dto.ward_id}`);
    }
  
    return [vaccinationSites, total];
  }

  async search(dto: SearchVaccinationSiteDto): Promise<[VaccinationSite[], number]> {
    const whereConditions: any = {};
    if (dto.name) {
      whereConditions.name = Like(`%${dto.name}%`);
    }
    if (dto.address) {
      whereConditions.address = Like(`%${dto.address}%`);
    }
    
    const page = dto.page || 1;
    const pageSize = dto.pageSize || 10;
    
    const [vaccinationSites, total] = await this.vaccinationSiteRepository.findAndCount({
      where: whereConditions,
      relations: ['ward', 'ward.district', 'ward.district.province'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  
    if (vaccinationSites.length === 0) {
      throw new NotFoundException('No vaccination sites found matching the criteria');
    }
  
    return [vaccinationSites, total];
  }

  async findOneVaccinationSite(id: number): Promise<ApiResponse<VaccinationSite>> {
    const vaccinationSite = await this.vaccinationSiteRepository.findOne({
      where: { id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    if (!vaccinationSite) {
      throw new NotFoundException('No vaccination site found!');
    }
    return createResponse(vaccinationSite, 'Vaccination site retrieved successfully', HttpStatus.OK);
  }

  async create(createVaccinationSite: CreateVaccinationSiteDto): Promise<ApiResponse<VaccinationSite>> {
    const nameExists = await this.checkVaccinationSiteNameExists(createVaccinationSite.name);
    if (nameExists) {
      throw new ConflictException('Vaccination site with this name already exists');
    }
  
    const ward = await this.wardRepository.findOne({
      where: { id: createVaccinationSite.ward_id },
      relations: ['district', 'district.province'],
    });
    if (!ward) {
      throw new NotFoundException('Invalid ward');
    }
    if (createVaccinationSite.vaccine_id) {
      const vaccineExists = await this.checkVaccineExists(createVaccinationSite.vaccine_id);
      if (!vaccineExists) {
        throw new NotFoundException('Invalid vaccine');
      }
    }

    const vaccinationSite = this.vaccinationSiteRepository.create({
      ...createVaccinationSite,
      ward,
    });
    const savedVaccinationSite = await this.vaccinationSiteRepository.save(vaccinationSite);
    return createResponse(savedVaccinationSite, 'Vaccination site created successfully', HttpStatus.CREATED);
  }

  async update(id: number, updateVaccinationSiteDto: UpdateVaccinationSiteDto): Promise<ApiResponse<VaccinationSite>> {
    const vaccinationSite = await this.vaccinationSiteRepository.findOne({
      where: { id },
      relations: ['ward'],
    });
    if (!vaccinationSite) {
      throw new NotFoundException('Vaccination site not found');
    }
  
    if (updateVaccinationSiteDto.name) {
      const nameExists = await this.checkVaccinationSiteNameExists(updateVaccinationSiteDto.name, id);
      if (nameExists) {
        throw new ConflictException('Vaccination site with this name already exists');
      }
    }
    if (updateVaccinationSiteDto.vaccine_id) {
      const vaccineExists = await this.checkVaccineExists(updateVaccinationSiteDto.vaccine_id);
      if (!vaccineExists) {
        throw new NotFoundException('Invalid vaccine');
      }
    }
    if (updateVaccinationSiteDto.ward_id) {
      const ward = await this.wardRepository.findOne({
        where: { id: updateVaccinationSiteDto.ward_id },
        relations: ['district', 'district.province'],
      });
      if (!ward) {
        throw new NotFoundException('Invalid ward');
      }
      vaccinationSite.ward = ward;
    }
    const updatedVaccinationSite = Object.assign(vaccinationSite, updateVaccinationSiteDto);
    const savedVaccinationSite = await this.vaccinationSiteRepository.save(updatedVaccinationSite);
    return createResponse(savedVaccinationSite, 'Vaccination site updated successfully', HttpStatus.OK);
  }

  async remove(id: number): Promise<ApiResponse<VaccinationSite>> {
    const result = await this.vaccinationSiteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vaccination site with ID ${id} not found`);
    }
    return createResponse(null, 'Vaccination site deleted successfully', HttpStatus.OK);
  }

  async checkVaccinationSiteNameExists(name: string, id?: number): Promise<boolean> {
    const query = this.vaccinationSiteRepository.createQueryBuilder('vaccinationSite')
      .where('LOWER(vaccinationSite.name) = LOWER(:name)', { name });
  
    if (id) {
      query.andWhere('vaccinationSite.id != :id', { id });
    }
  
    const count = await query.getCount();
    return count > 0;
  }

  async checkVaccineExists(vaccineId: number): Promise<boolean> {
    const vaccine = await this.vaccinesRepository.findOne({
      where: { id: vaccineId }
    });
    return !!vaccine;
  }
}
