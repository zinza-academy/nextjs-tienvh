import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums/user.enum";
import { PaginationInterceptor } from "common/interceptors/pagination.interceptor";
import { AllowedRoles } from "modules/auth/decorators/roles-route.decorator";
import { CreateVaccinationSiteDto, FindVaccinationSiteByWardIdDto, PaginationDto, SearchVaccinationSiteDto, UpdateVaccinationSiteDto } from "./dto/vaccination-sites.dto";
import { VaccinationSitesService } from "./vaccination-sites.service";
import { RoleGuard } from "modules/auth/guard/roles.guard";

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(private readonly vaccinationSitesService: VaccinationSitesService) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  async findAll(@Query(ValidationPipe) dto: PaginationDto) {
    return this.vaccinationSitesService.findAll(dto);
  }

  @Get('by-ward')
  @UseInterceptors(PaginationInterceptor)
  async findByWardId(@Query(ValidationPipe) dto: FindVaccinationSiteByWardIdDto) {
    return this.vaccinationSitesService.findByWardId(dto);
  }

  @Get('search')
  @UseInterceptors(PaginationInterceptor)
  async search(@Query(ValidationPipe) dto: SearchVaccinationSiteDto) {
    return this.vaccinationSitesService.search(dto);
  }

  @Get('details')
  async findOneVaccinationSite(@Query('id', ParseIntPipe) id: number) {
    return this.vaccinationSitesService.findOneVaccinationSite(id);
  }

  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  @Post()
  async create(@Body(ValidationPipe) createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  @Patch()
  async update(@Query('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateVaccinationSiteDto: UpdateVaccinationSiteDto) {
    return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  }

  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  @Delete()
  async remove(@Query('id',ParseIntPipe) id: string) {
    return this.vaccinationSitesService.remove(+id);
  }
}
