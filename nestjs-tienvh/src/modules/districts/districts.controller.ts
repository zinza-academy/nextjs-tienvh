import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiResponse } from 'common/utils/response.util';
import { Districts } from 'entities/districts.entity';
import { DistrictsService } from './districts.service';



@Controller('/districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get('province/:provinceId')
  async findByProvinceId(
    @Param('provinceId', ParseIntPipe) provinceId: number
  ): Promise<ApiResponse<Districts[]>> {
    return this.districtsService.findByProvinceId(provinceId);
  }
}
