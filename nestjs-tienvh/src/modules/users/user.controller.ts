import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { ReceiveUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { ApiResponse } from 'src/common/utils/response.util';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';


@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly userService: UserService) {}

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
