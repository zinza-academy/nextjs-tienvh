import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateVaccineDto {
  @IsString()
  @IsNotEmpty({message: 'Tên vaccine không được để trống'})
  name: string;

  @IsString()
  @IsNotEmpty({message: 'Tên nhà sản xuất không được để trống'})
  producer: string;

  @IsString()
  @IsNotEmpty({message: 'Số lô không được để trống'})
  batch_number: string;

  @IsDateString()
  @IsNotEmpty({message: 'Ngày sản xuất không được để trống'})
  manufacture_date: Date;

  @IsDateString()
  @IsNotEmpty({message: 'Ngày hết hạn không được để trống'})
  expiration_date: Date;
}

export class UpdateVaccineDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsString()
  batch_number?: string;

  @IsOptional()
  @IsDateString()
  manufacture_date?: Date;

  @IsOptional()
  @IsDateString()
  expiration_date?: Date;
}
