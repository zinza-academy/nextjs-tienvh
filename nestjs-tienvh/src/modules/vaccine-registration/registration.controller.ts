import { Body, Controller, Get, Query, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors, ValidationPipe, ForbiddenException, Request } from "@nestjs/common";
import { Role } from "common/enums/user.enum";
import { PaginationInterceptor } from "common/interceptors/pagination.interceptor";
import { AllowedRoles } from "modules/auth/decorators/roles-route.decorator";
import { RoleGuard } from "modules/auth/guard/roles.guard";
import { VaccinesRegistrationDto, UpdateVaccinesRegistrationDto } from "./dto/registration.dto";
import { PaginationDto } from "modules/vaccination-sites/dto/vaccination-sites.dto";
import { VaccinesRegistrationService } from "./registration.service";
import { JwtAuthGuard } from "modules/auth/guard/jwt-auth.guard";
@Controller('vaccines-registration')
export class VaccinesRegistrationController {
  constructor(private readonly vaccinesRegistrationService: VaccinesRegistrationService) {}
  @Get()
  @UseInterceptors(PaginationInterceptor)
  async findAll(@Query(ValidationPipe) dto: PaginationDto, @Request() req) {
    if (req.user.role === Role.ADMIN) {
      return this.vaccinesRegistrationService.findAll(dto);
    } else {
      return this.vaccinesRegistrationService.findByUserId(req.user.id, dto);
    }
  }
  
  @Get('details')
  async findOne(@Query('id', ParseIntPipe) id: number, @Request() req) {
    return this.vaccinesRegistrationService.findOne(id);
  }

  @Post()
  async create(@Body(ValidationPipe) createDto: VaccinesRegistrationDto, @Request() req) {
    createDto.user_id = req.user.id;
    return this.vaccinesRegistrationService.create(createDto);
  }

  @Patch()
  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  async update(
    @Query('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateDto: UpdateVaccinesRegistrationDto
  ) {
    return this.vaccinesRegistrationService.update(id, updateDto);
  }

  @Patch('approve')
  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  async approveRegistration(@Query('id', ParseIntPipe) id: number) {
    return this.vaccinesRegistrationService.approveRegistration(id);
  }

  @Patch('inject')
  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  async markAsInjected(@Query('id', ParseIntPipe) id: number) {
    return this.vaccinesRegistrationService.markAsInjected(id);
  }
}
