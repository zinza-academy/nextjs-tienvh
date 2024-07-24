import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from 'common/utils/response.util';
import { ReceiveUserDto, UpdateUserDto, UserDto } from './dto/users.dto';
import { UsersService } from './users.service';
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

  @Patch()
  async update(@Query('id',ParseIntPipe) id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete()
  async remove(@Query('id',ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
