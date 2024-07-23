import { Users } from "entities/users.entity";
import { ReceiveUserDto, UpdateUserDto, UserDto } from "../dto/users.dto";


  export class UsersMapper {
    static toCreateEntity(dto: UserDto): Users {
      const entity = new Users();
      entity.cmt = dto.cmt;
      entity.email = dto.email;
      entity.password = dto.password;
      entity.name = dto.name;
      entity.dob = dto.dob;
      entity.gender = dto.gender;
      entity.ward = { id: dto.ward_id } as any;
      return entity;
    }
  
    static toUpdateEntity(existingUser: Users, dto: UpdateUserDto): Users {
      if (dto.cmt !== undefined) existingUser.cmt = dto.cmt;
      if (dto.email !== undefined) existingUser.email = dto.email;
      if (dto.password !== undefined) existingUser.password = dto.password;
      if (dto.name !== undefined) existingUser.name = dto.name;
      if (dto.dob !== undefined) existingUser.dob = dto.dob;
      if (dto.gender !== undefined) existingUser.gender = dto.gender;
      if (dto.ward_id !== undefined) existingUser.ward = { id: dto.ward_id } as any;
      return existingUser;
    }
  
    static toDto(entity: Users): ReceiveUserDto {
      const dto = new ReceiveUserDto();
      dto.id = entity.id;
      dto.cmt = entity.cmt;
      dto.email = entity.email;
      dto.name = entity.name;
      dto.dob = entity.dob;
      dto.gender = entity.gender;
      dto.ward_id = entity.ward.id;
      dto.district_id = entity.ward.district.id;
      dto.province_id = entity.ward.district.province.id;
      return dto;
    }
  }
