import { ApiResponse } from './../../common/utils/response.util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, ListUsersDto} from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ListUsersDto[]> {
    const users = await this.userRepository.find({
      select: ['id', 'cmt', 'email', 'name', 'dob', 'gender', 'province', 'district', 'ward']
    });
    return users.map(UserMapper.toListDto);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
