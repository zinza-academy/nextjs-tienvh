import { User } from '../entities/user.entity';
import { ReceiveUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';

export class UserMapper {
  static toCreateEntity(dto: UserDto): User {
    const entity = new User();
    Object.assign(entity, dto);
    return entity;
  }
  static toUpdateEntity(existingUser: User, dto: UpdateUserDto): User {
    return Object.assign(existingUser, dto);
  }

  static toDto(entity: User): ReceiveUserDto {
    const dto = new ReceiveUserDto();
    dto.id = entity.id;
    dto.cmt = entity.cmt;
    dto.email = entity.email;
    dto.name = entity.name;
    dto.dob = entity.dob;
    dto.gender = entity.gender;
    dto.province_id = entity.province_id;
    dto.district_id = entity.district_id;
    dto.ward_id = entity.ward_id;
    return dto;
  }
}
