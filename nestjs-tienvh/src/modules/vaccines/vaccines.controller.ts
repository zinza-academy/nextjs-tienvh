import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums/user.enum";
import { PaginationInterceptor } from "common/interceptors/pagination.interceptor";
import { AllowedRoles } from "modules/auth/decorators/roles-route.decorator";
import { CreateVaccineDto, UpdateVaccineDto } from "./dto/vaccines.dto";
import { VaccinesService } from "./vaccines.service";
import { ApiResponse } from "common/utils/response.util";
import { Vaccines } from "entities/vaccines.entity";
@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccineService: VaccinesService) {}

  @AllowedRoles(Role.ADMIN)
  @Get()
  async findAll(): Promise<ApiResponse<Vaccines[]>> {
    return this.vaccineService.findAll();
  }

  @AllowedRoles(Role.ADMIN)
  @Get('details')
  async findOneVaccine(@Query('id', ParseIntPipe) id: number) {
    return this.vaccineService.findOneVaccine(id);
  }

  @AllowedRoles(Role.ADMIN)
  @Post()
  async create(@Body(ValidationPipe) createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @AllowedRoles(Role.ADMIN)
  @Patch()
  async update(@Query('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineService.update(+id, updateVaccineDto);
  }

  @AllowedRoles(Role.ADMIN)
  @Delete()
  async remove(@Query('id',ParseIntPipe) id: string) {
    return this.vaccineService.remove(+id);
  }
}
