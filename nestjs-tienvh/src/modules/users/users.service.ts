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
import { Wards } from 'src/entities/wards.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Wards)
    private wardRepository: Repository<Wards>
  ) {}

  async findAll(): Promise<ApiResponse<ReceiveUserDto[]>> {
    const users = await this.userRepository.find({
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    const userDtos = users.map((user) => UsersMapper.toDto(user));
    return createResponse(userDtos, 'Users retrieved successfully', HttpStatus.OK);
  }

  async create(createUser: UserDto): Promise<ApiResponse<ReceiveUserDto>> {
    await this.checkEmailExists(createUser.email);
    
    const ward = await this.wardRepository.findOne({
      where: { id: createUser.ward_id },
      relations: ['district', 'district.province'],
    });
  
    if (!ward) {
      throw new NotFoundException('Invalid ward');
    }
  
    if (ward.district.province.id !== createUser.province_id) {
      throw new NotFoundException('Invalid province');
    }
  
    if (ward.district.id !== createUser.district_id) {
      throw new NotFoundException('Invalid district');
    }
  
    const userEntity = UsersMapper.toCreateEntity(createUser);
    userEntity.role = 0;
    const savedUser = await this.userRepository.save(userEntity);
    const fullUser = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    
    const userDto = UsersMapper.toDto(fullUser);
    return createResponse(userDto, 'User created successfully', HttpStatus.CREATED);
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<ApiResponse<ReceiveUserDto>> {
    const existingUser = await this.userRepository.findOne({
      where: { id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    if (updateUser.email && updateUser.email !== existingUser.email) {
      await this.checkEmailExists(updateUser.email);
    }
  
    if (updateUser.ward_id || updateUser.district_id || updateUser.province_id) {
      let ward: Wards;
      if (updateUser.ward_id) {
        ward = await this.wardRepository.findOne({
          where: { id: updateUser.ward_id },
          relations: ['district', 'district.province'],
        });
        if (!ward) {
          throw new NotFoundException('Invalid ward');
        }
      }
  
      if (updateUser.district_id && (!ward || ward.district.id !== updateUser.district_id)) {
        throw new NotFoundException('Invalid district');
      }
      if (updateUser.province_id && (!ward || ward.district.province.id !== updateUser.province_id)) {
        throw new NotFoundException('Invalid province');
      }
  
      existingUser.ward = ward;
    }
  
    const updatedUserEntity = UsersMapper.toUpdateEntity(existingUser, updateUser);
    const savedUser = await this.userRepository.save(updatedUserEntity);
    
    const fullUser = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    
    const userDto = UsersMapper.toDto(fullUser);
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
