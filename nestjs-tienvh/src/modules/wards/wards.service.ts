import {
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Districts } from 'entities/districts.entity';
import { Wards } from 'entities/wards.entity';
import { Repository } from 'typeorm';
import { ApiResponse, createResponse } from '../../common/utils/response.util';


@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Districts)
    private districtsRepository: Repository<Districts>,
    @InjectRepository(Wards)
    private wardsRepository: Repository<Wards>,
  ) {}

  async findByDistrictId(districtId: number): Promise<ApiResponse<Wards[]>> {
    const district = await this.districtsRepository.findOne({where: { id: districtId}});
      if (!district) {
        throw new NotFoundException('Invalid district');
      }

    const wards = await this.wardsRepository.find({
      where: { district: { id: districtId } },
      relations: ['district','district.province'],
    });
    if (!wards || wards.length === 0) {
      throw new NotFoundException(`No wards found for district ID ${districtId}`);
    }
    return createResponse(wards, 'Wards retrieved successfully', HttpStatus.OK);
  }
}
