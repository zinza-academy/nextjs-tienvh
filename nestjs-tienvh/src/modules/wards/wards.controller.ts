import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ApiResponse } from 'common/utils/response.util';
import { Wards } from 'entities/wards.entity';
import { WardsService } from './wards.service';



@Controller('/wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Get('district/:districtId')
  async findByDistrictId(
    @Param('districtId', ParseIntPipe) districtId: number
  ): Promise<ApiResponse<Wards[]>> {
    return this.wardsService.findByDistrictId(districtId);
  }
}
