import {
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, createResponse } from '../../common/utils/response.util';
import { Provinces } from 'entities/provinces.entity';
import { Districts } from 'entities/districts.entity';


@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(Districts)
    private districtsRepository: Repository<Districts>,
    @InjectRepository(Provinces)
    private provinceRepository: Repository<Provinces>,
  ) {}

  async findByProvinceId(provinceId: number): Promise<ApiResponse<Districts[]>> {
    const province = await this.provinceRepository.findOne({where: { id: provinceId}});
      if (!province) {
        throw new NotFoundException('Invalid province');
      }

    const districts = await this.districtsRepository.find({
      where: { province: { id: provinceId } },
      relations: ['province'],
    });
    if (!districts || districts.length === 0) {
      throw new NotFoundException(`No districts found for province ID ${provinceId}`);
    }
    return createResponse(districts, 'Districts retrieved successfully', HttpStatus.OK);
  }
}
