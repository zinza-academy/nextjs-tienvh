import { ApiResponse, createResponse } from '../../common/utils/response.util';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, ReceiveUserDto, UpdateUserDto } from './dto/users.dto';
import { Users } from '../../entities/users.entity';
import { UsersMapper } from './mapper/users.mapper';
import { Wards } from 'entities/wards.entity';
import { Provinces } from 'entities/provinces.entity';
import { Districts } from 'entities/districts.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Provinces)
    private provinceRepository: Repository<Provinces>,
    @InjectRepository(Districts)
    private districtRepository: Repository<Districts>,
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

  async findOne(id: number): Promise<ApiResponse<ReceiveUserDto>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const userDtos = UsersMapper.toDto(user);
    return createResponse(userDtos, 'Users retrieved successfully', HttpStatus.OK);
  }

  async create(createUser: UserDto): Promise<ApiResponse<ReceiveUserDto>> {
    await this.checkEmailExists(createUser.email);
    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const province = await this.provinceRepository.findOne({where: { id: createUser.province_id }});
    if (!province) {
      throw new NotFoundException('Invalid province');
    }

    const district = await this.districtRepository.findOne({
      where: { id: createUser.district_id, province: { id: createUser.province_id } },
      relations: ['province'],
    });
    if (!district) {
      throw new NotFoundException('Invalid district');
    }

    const ward = await this.wardRepository.findOne({
      where: { id: createUser.ward_id, district: { id: createUser.district_id } },
      relations: ['district'],
    });
    if (!ward) {
      throw new NotFoundException('Invalid ward');
    }

    const userEntity = UsersMapper.toCreateEntity(createUser);
    userEntity.role = 1;
    userEntity.password = hashedPassword;
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
  
    if (updateUser.province_id) {
      const province = await this.provinceRepository.findOne({ where: { id: updateUser.province_id } });
      if (!province) {
        throw new NotFoundException('Invalid province');
      }
    }
  
    if (updateUser.district_id) {
      const district = await this.districtRepository.findOne({
        where: { id: updateUser.district_id, province: { id: updateUser.province_id } },
        relations: ['province'],
      });
      if (!district) {
        throw new NotFoundException('Invalid district');
      }
    }
  
    if (updateUser.ward_id) {
      const ward = await this.wardRepository.findOne({
        where: { id: updateUser.ward_id, district: { id: updateUser.district_id } },
        relations: ['district'],
      });
      if (!ward) {
        throw new NotFoundException('Invalid ward');
      }
    }
    
    const updatedUserEntity = UsersMapper.toUpdateEntity(existingUser, updateUser);
    if (updateUser.ward_id) {
      const ward = await this.wardRepository.findOne({
        where: { id: updateUser.ward_id },
        relations: ['district', 'district.province'],
      });
      updatedUserEntity.ward = ward;
    }
    if (updateUser.password) {
      updatedUserEntity.password = await bcrypt.hash(updateUser.password, 10);
    }
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

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ 
      where: { email },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
  }

  async findById(id: number): Promise<Users | undefined> {
    return this.userRepository.findOne({ 
      where: { id },
      relations: ['ward', 'ward.district', 'ward.district.province'],
    });
  }

  private async checkEmailExists(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = newPassword;
    await this.userRepository.save(user);
  }

  async updateResetToken(userId: number, resetToken: string, resetTokenExpiry: Date): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await this.userRepository.save(user);
  }

  findByResetToken(token: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { resetToken: token } });
  }
  
}
