import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiResponse } from 'common/utils/response.util';
import { Districts } from 'entities/districts.entity';
import { DistrictsService } from './districts.service';
import { Public } from 'modules/auth/decorators/public-route.decorator';
@Controller('/districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Public()
  @Get()
  async findByProvinceId(
    @Query('province_id', ParseIntPipe) province_id: number
  ): Promise<ApiResponse<Districts[]>> {
    return this.districtsService.findByProvinceId(province_id);
  }
}
