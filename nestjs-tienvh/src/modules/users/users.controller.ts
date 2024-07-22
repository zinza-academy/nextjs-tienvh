import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

import { ReceiveUserDto, UpdateUserDto, UserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiResponse } from 'common/utils/response.util';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<ApiResponse<ReceiveUserDto[]>> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
