import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

import { ApiResponse } from 'common/utils/response.util';
import { Wards } from 'entities/wards.entity';
import { WardsService } from './wards.service';
@Controller('/wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Get()
  async findByDistrictId(
    @Query('district_id', ParseIntPipe) district_id: number
  ): Promise<ApiResponse<Wards[]>> {
    return this.wardsService.findByDistrictId(district_id);
  }
}
