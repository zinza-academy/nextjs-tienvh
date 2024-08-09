import { Controller, Get } from '@nestjs/common';

import { ApiResponse } from 'common/utils/response.util';
import { Provinces } from 'entities/provinces.entity';
import { ProvincesService } from './provinces.service';
import { Public } from 'modules/auth/decorators/public-route.decorator';
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Public()
  @Get()
  async findAll(): Promise<ApiResponse<Provinces[]>> {
    return this.provincesService.findAll();
  }

}
