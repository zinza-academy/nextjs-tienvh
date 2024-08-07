import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe, Request, Param, ForbiddenException } from '@nestjs/common';
import { ApiResponse } from 'common/utils/response.util';
import { ReceiveUserDto, UpdateUserDto, UserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AllowedRoles } from 'modules/auth/decorators/roles-route.decorator';
import { Role } from 'common/enums/user.enum';
import { RoleGuard } from 'modules/auth/guard/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(RoleGuard)
  @AllowedRoles(Role.ADMIN)
  async findAll(): Promise<ApiResponse<ReceiveUserDto[]>> {
    return this.userService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<ApiResponse<ReceiveUserDto>> {
    if (req.user.role === Role.ADMIN) {
      return this.userService.findOne(id);
    } else {
      const user = await this.userService.findOne(+id);
      if (user.data.id !== req.user.id) {
        throw new ForbiddenException('You are not allowed to view detail this user');
      }
      return user;
    }
  }

  @Post()
  async create(@Body(ValidationPipe) createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto, @Request() req) {
    if (req.user.role === Role.ADMIN) {
      return this.userService.update(id, updateUserDto);
    } else {
      if (id !== req.user.id) {
        throw new ForbiddenException('You are not allowed to update this user');
      }
      return this.userService.update(id, updateUserDto);
    }
  }

  @Delete()
  async remove(@Query('id',ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
