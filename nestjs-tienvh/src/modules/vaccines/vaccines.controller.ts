import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums/user.enum";
import { ApiResponse } from "common/utils/response.util";
import { Vaccines } from "entities/vaccines.entity";
import { AllowedRoles } from "modules/auth/decorators/roles-route.decorator";
import { RoleGuard } from "modules/auth/guard/roles.guard";
import { CreateVaccineDto, UpdateVaccineDto } from "./dto/vaccines.dto";
import { VaccinesService } from "./vaccines.service";
@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccineService: VaccinesService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Vaccines[]>> {
    return this.vaccineService.findAll();
  }

  @Get('details')
  async findOneVaccine(@Query('id', ParseIntPipe) id: number) {
    return this.vaccineService.findOneVaccine(id);
  }

  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  @Post()
  async create(@Body(ValidationPipe) createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  @Patch()
  async update(@Query('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineService.update(+id, updateVaccineDto);
  }

  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  @Delete()
  async remove(@Query('id',ParseIntPipe) id: string) {
    return this.vaccineService.remove(+id);
  }
}
