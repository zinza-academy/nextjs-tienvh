import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
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
