import { Controller, Get } from '@nestjs/common';

import { ApiResponse } from 'common/utils/response.util';
import { Provinces } from 'entities/provinces.entity';
import { ProvincesService } from './provinces.service';


@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Provinces[]>> {
    return this.provincesService.findAll();
  }

}
