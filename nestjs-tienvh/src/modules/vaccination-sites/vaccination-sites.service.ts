import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse, createResponse } from "common/utils/response.util";
import { VaccinationSite } from "entities/vaccination-site.entity";
import { Wards } from "entities/wards.entity";
import { Like, Repository } from "typeorm";
import { CreateVaccinationSiteDto, UpdateVaccinationSiteDto } from "./dto/vaccination-sites.dto";
@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteRepository: Repository<VaccinationSite>,
    @InjectRepository(Wards)
    private wardRepository: Repository<Wards>
  ) {}

  async findAll(page: number, pageSize: number): Promise<[VaccinationSite[], number]> {
    const [vaccinationSites, total] = await this.vaccinationSiteRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    return [vaccinationSites, total];
  }

  async findByWardId(wardId: number, page: number, pageSize: number): Promise<[VaccinationSite[], number]> {
    const [vaccinationSites, total] = await this.vaccinationSiteRepository.findAndCount({
      where: { ward: { id: wardId } },
      relations: ['ward', 'ward.district', 'ward.district.province'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  
    if (vaccinationSites.length === 0) {
      throw new NotFoundException(`No vaccination sites found for ward ID ${wardId}`);
    }
  
    return [vaccinationSites, total];
  }

  async search(
    name?: string,
    address?: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<[VaccinationSite[], number]> {
    const whereConditions: any = {};
    if (name) {
      whereConditions.name = Like(`%${name}%`);
    }
    if (address) {
      whereConditions.address = Like(`%${address}%`);
    }

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
    const ward = await this.wardRepository.findOne({
      where: { id: createVaccinationSite.ward_id },
      relations: ['district', 'district.province'],
    });
    if (!ward) {
      throw new NotFoundException('Invalid ward');
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

  
}
