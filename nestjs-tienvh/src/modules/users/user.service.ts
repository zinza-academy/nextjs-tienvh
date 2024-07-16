import { ApiResponse, createResponse } from './../../common/utils/response.util';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, ReceiveUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ApiResponse<ReceiveUserDto[]>> {
    const users = await this.userRepository.find();
    const userDtos = users.map((user) => UserMapper.toDto(user));
    return createResponse(userDtos, 'Users retrieved successfully', 200);
  }

  async create(createUser: UserDto): Promise<ApiResponse<ReceiveUserDto>> {
    await this.checkEmailExists(createUser.email);
    const userEntity = UserMapper.toCreateEntity(createUser);
    const savedUser = await this.userRepository.save(userEntity);
    const userDto = UserMapper.toDto(savedUser);
    return createResponse(userDto, 'User created successfully', 201);
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<ApiResponse<ReceiveUserDto>> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUser.email && updateUser.email !== existingUser.email) {
      await this.checkEmailExists(updateUser.email);
    }
    const updatedUserEntity = UserMapper.toUpdateEntity(
      existingUser,
      updateUser,
    );

    const savedUser = await this.userRepository.save(updatedUserEntity);
    const userDto = UserMapper.toDto(savedUser);
    return createResponse(userDto, 'User updated successfully', 200);
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return createResponse(null, 'User deleted successfully', 200);
  }

  private async checkEmailExists(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }
}
