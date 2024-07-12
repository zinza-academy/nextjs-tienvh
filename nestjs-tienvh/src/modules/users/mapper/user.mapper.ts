import { User } from '../entities/user.entity';
import { ListUsersDto } from '../dto/user.dto';

export class UserMapper {
  static toListDto(user: User): ListUsersDto {
    const dto = new ListUsersDto();
    dto.id = user.id;
    dto.cmt = user.cmt;
    dto.email = user.email;
    dto.name = user.name;
    dto.dob = user.dob;
    dto.gender = user.gender;
    dto.province = user.province;
    dto.district = user.district;
    dto.ward = user.ward;
    return dto;
  }
}
