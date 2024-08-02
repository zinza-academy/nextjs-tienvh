import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateVaccinationSiteDto {
  @IsString()
  @IsNotEmpty({message: 'Tên vaccination-site không được để trống'})
  name: string;

  @IsString()
  @IsNotEmpty({message: 'Tên người quản lí không được để trống'})
  manager: string;

  @IsNumber()
  @IsNotEmpty({message: 'Số bàn tiêm không được để trống'})
  @IsInt({message: 'Số bàn tiêm phải là số nguyên'})
  @IsPositive({message: 'Số bàn tiêm phải là số dương'})
  table_number: number;

  @IsNumber()
  @IsNotEmpty({message: 'Xã/Phường không được để trống'})
  @IsInt({message: 'Mã Xã/Phường phải là số nguyên'})
  @IsPositive({message: 'Mã Xã/Phường phải là số dương'})
  ward_id: number;

  @IsString()
  @IsNotEmpty({message: 'Địa chỉ tiêm không được để trống'})
  address: string;
}

export class UpdateVaccinationSiteDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @IsOptional()
  @IsNumber()
  @IsInt({message: 'Số bàn tiêm phải là số nguyên'})
  @IsPositive({message: 'Số bàn tiêm phải là số dương'})
  table_number?: number;

  @IsOptional()
  @IsNumber()
  @IsInt({message: 'Mã Xã/Phường phải là số nguyên'})
  @IsPositive({message: 'Mã Xã/Phường phải là số dương'})
  ward_id?: number;

  @IsString()
  @IsOptional()
  address?: string;
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  pageSize: number;
}
export class SearchVaccinationSiteDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  pageSize: number;
}

export class FindVaccinationSiteByWardIdDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  ward_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  pageSize: number;
}
