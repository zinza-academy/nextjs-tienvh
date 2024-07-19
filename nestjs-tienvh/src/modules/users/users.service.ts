import { ApiResponse, createResponse } from '../../common/utils/response.util';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, ReceiveUserDto, UpdateUserDto } from './dto/user.dto';

import { Users } from '../../entities/users.entity';
import { UsersMapper } from './mapper/users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<ApiResponse<ReceiveUserDto[]>> {
    const users = await this.userRepository.find();
    const userDtos = users.map((user) => UsersMapper.toDto(user));
    return createResponse(userDtos, 'Users retrieved successfully', HttpStatus.OK);
  }

  async create(createUser: UserDto): Promise<ApiResponse<ReceiveUserDto>> {
    await this.checkEmailExists(createUser.email);
    const userEntity = UsersMapper.toCreateEntity(createUser);
    const savedUser = await this.userRepository.save(userEntity);
    const userDto = UsersMapper.toDto(savedUser);
    return createResponse(userDto, 'User created successfully', HttpStatus.CREATED);
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<ApiResponse<ReceiveUserDto>> {
    const existingUser = await this.userRepository.findOneBy({ id });
    
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUser.email && updateUser.email !== existingUser.email) {
      await this.checkEmailExists(updateUser.email);
    }
    const updatedUserEntity = UsersMapper.toUpdateEntity(
      existingUser,
      updateUser,
    );

    const savedUser = await this.userRepository.save(updatedUserEntity);
    const userDto = UsersMapper.toDto(savedUser);
    return createResponse(userDto, 'User updated successfully', HttpStatus.OK);
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return createResponse(null, 'User deleted successfully', HttpStatus.OK);
  }

  private async checkEmailExists(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }
}
