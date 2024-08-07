import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { RegistrationStatus } from "common/enums/vaccine-registration.enum";

export class VaccinesRegistrationDto {
  @IsNumber()
  @IsNotEmpty({message: 'User id không được để trống'})
  @IsInt({message: 'User id phải là số nguyên'})
  @IsPositive({message: 'User id phải là số dương'})
  @IsOptional()
  user_id?: number;

  @IsNumber()
  @IsNotEmpty({message: 'Vaccination Site không được để trống'})
  @IsInt({message: 'Vaccination Site id phải là số nguyên'})
  @IsPositive({message: 'Vaccination Site id phải là số dương'})
  vaccination_site_id: number;

  @IsNumber()
  @IsNotEmpty({message: 'Priority id không được để trống'})
  @IsInt({message: 'Priority id phải là số nguyên'})
  @IsPositive({message: 'Priority id phải là số dương'})
  priority_group_id: number;

  @IsNumber()
  @IsNotEmpty({message: 'Job id không được để trống'})
  @IsInt({message: 'Job id phải là số nguyên'})
  @IsPositive({message: 'Job id phải là số dương'})
  job_id: number;

  @IsNumber()
  @IsNotEmpty({message: 'Schedule id không được để trống'})
  @IsInt({message: 'Schedule id phải là số nguyên'})
  @IsPositive({message: 'Schedule id phải là số dương'})
  schedule_id: number;

  @IsString()
  @IsNotEmpty({message: 'số thẻ bhyt không được để trống'})
  bhyt: string;

  @IsString()
  @IsNotEmpty({message: 'Nơi làm việc không được để trống'})
  work_place: string;

}

export class UpdateVaccinesRegistrationDto {
  @IsOptional()
  @IsNumber()
  @IsInt({message: 'User id phải là số nguyên'})
  @IsPositive({message: 'User id phải là số dương'})
  user_id: number;

  @IsNumber()
  @IsOptional()
  @IsInt({message: 'Vaccination Site id phải là số nguyên'})
  @IsPositive({message: 'Vaccination Site id phải là số dương'})
  vaccination_site_id: number;

  @IsNumber()
  @IsOptional()
  @IsInt({message: 'Priority id phải là số nguyên'})
  @IsPositive({message: 'Priority id phải là số dương'})
  priority_group_id: number;

  @IsNumber()
  @IsOptional()
  @IsInt({message: 'Job id phải là số nguyên'})
  @IsPositive({message: 'Job id phải là số dương'})
  job_id: number;

  @IsNumber()
  @IsOptional()
  @IsInt({message: 'Schedule id phải là số nguyên'})
  @IsPositive({message: 'Schedule id phải là số dương'})
  schedule_id: number;

  @IsString()
  @IsOptional()
  bhyt: string;

  @IsString()
  @IsOptional()
  work_place: string;

  @IsEnum(RegistrationStatus)
  @IsOptional()
  status: RegistrationStatus;

  @IsDateString()
  @IsOptional()
  time_inject: Date;
}
