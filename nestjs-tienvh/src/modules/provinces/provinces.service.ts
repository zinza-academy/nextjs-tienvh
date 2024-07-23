import {
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, createResponse } from '../../common/utils/response.util';
import { Provinces } from 'entities/provinces.entity';
@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Provinces)
    private provinceRepository: Repository<Provinces>,
  ) {}

  async findAll(): Promise<ApiResponse<Provinces[]>> {
    const provinces = await this.provinceRepository.find();
    return createResponse(provinces, 'Provinces retrieved successfully', HttpStatus.OK);
  }

}
