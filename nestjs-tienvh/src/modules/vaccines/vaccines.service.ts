import { ConflictException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse, createResponse } from "common/utils/response.util";
import { Vaccines } from "entities/vaccines.entity";
import { Repository } from "typeorm";
import { CreateVaccineDto, UpdateVaccineDto } from "./dto/vaccines.dto";

@Injectable()
export class VaccinesService {
  constructor(
    @InjectRepository(Vaccines)
    private vaccinesRepository: Repository<Vaccines>,
  ) {}

  async findAll(): Promise<ApiResponse<Vaccines[]>> {
    const vaccines = await this.vaccinesRepository.find();
    return createResponse(vaccines, 'Vaccines retrieved successfully', HttpStatus.OK);
  }

  async findOneVaccine(id: number): Promise<ApiResponse<Vaccines>> {
    const vaccine = await this.vaccinesRepository.findOneBy({ id: id });
    if (!vaccine) throw new NotFoundException('No vaccine found!');
    return createResponse(vaccine, 'Vaccine retrieved successfully', HttpStatus.CREATED);
  }

  async create(createVaccine: CreateVaccineDto): Promise<ApiResponse<CreateVaccineDto>> {
    await this.checkBatchNumberExists(createVaccine.batch_number);
    const vaccine = await this.vaccinesRepository.save(createVaccine);
    return createResponse(vaccine, 'Vaccine created successfully', HttpStatus.CREATED);
  }

  async update(vaccine_id: number, updateVaccineDto: UpdateVaccineDto): Promise<ApiResponse<Vaccines>> {
    const vaccine = await this.vaccinesRepository.findOne({ where: { id: vaccine_id } });
    if (!vaccine) {
      return createResponse(null, 'Vaccine not found', HttpStatus.NOT_FOUND);
    }
    if (updateVaccineDto.batch_number && updateVaccineDto.batch_number !== vaccine.batch_number) {
      await this.checkBatchNumberExists(updateVaccineDto.batch_number);
    }
    const updatedVaccine = await this.vaccinesRepository.save({ ...vaccine, ...updateVaccineDto });
    return createResponse(updatedVaccine, 'Vaccine updated successfully', HttpStatus.OK);
  }

  async remove(id: number): Promise<ApiResponse<Vaccines>> {
    const result = await this.vaccinesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vaccine with ID ${id} not found`);
    }
    return createResponse(null, 'Vaccine deleted successfully', HttpStatus.OK);
  }

  private async checkBatchNumberExists(batch_number: string): Promise<void> {
    const existingVaccine = await this.vaccinesRepository.findOneBy({ batch_number });
    if (existingVaccine) {
      throw new ConflictException('Vaccine already exists');
    }
  }
}
