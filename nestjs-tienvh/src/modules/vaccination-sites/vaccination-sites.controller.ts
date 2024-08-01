import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums/user.enum";
import { PaginationInterceptor } from "common/interceptors/pagination.interceptor";
import { AllowedRoles } from "modules/auth/decorators/roles-route.decorator";
import { CreateVaccinationSiteDto, UpdateVaccinationSiteDto } from "./dto/vaccination-sites.dto";
import { VaccinationSitesService } from "./vaccination-sites.service";

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(private readonly vaccinationSitesService: VaccinationSitesService) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.vaccinationSitesService.findAll(page, pageSize);
  }

  @Get('by-ward')
  @UseInterceptors(PaginationInterceptor)
  async findByWardId(
    @Query('wardId', ParseIntPipe) wardId: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.vaccinationSitesService.findByWardId(wardId, page, pageSize);
  }

  @Get('search')
  @UseInterceptors(PaginationInterceptor)
  async search(
    @Query('name') name?: string,
    @Query('address') address?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.vaccinationSitesService.search(name, address, page, pageSize);
  }

  @Get('details')
  async findOneVaccinationSite(@Query('id', ParseIntPipe) id: number) {
    return this.vaccinationSitesService.findOneVaccinationSite(id);
  }

  @AllowedRoles(Role.ADMIN)
  @Post()
  async create(@Body(ValidationPipe) createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @AllowedRoles(Role.ADMIN)
  @Patch()
  async update(@Query('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateVaccinationSiteDto: UpdateVaccinationSiteDto) {
    return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  }

  @AllowedRoles(Role.ADMIN)
  @Delete()
  async remove(@Query('id',ParseIntPipe) id: string) {
    return this.vaccinationSitesService.remove(+id);
  }
}
