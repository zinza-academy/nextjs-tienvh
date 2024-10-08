import { IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Gender } from '../../../common/enums/user.enum';
export class RegisterDTO{
  @IsNumberString()
  @Matches(/^\d{9}$|^\d{12}$/,{message: 'CMND/CCCD phải có 9 hoặc 12 số'})
  @IsNotEmpty({message: 'CMND/CCCD không được để trống'})
  cmt: string

  @IsEmail()
  @IsNotEmpty({message: 'Email không được để trống'})
  email: string;

  @IsString()
  @MinLength(8, {message:'Mật khẩu phải có ít nhất 8 kí tự'})
  @MaxLength(64, {message: 'Mật khẩu không vượt quá 64 kí tự'})
  @Matches(/^[^\s]+$/, { message: 'Mật khẩu không được chứa dấu cách' })
  @IsNotEmpty({message: 'Mật khẩu không được để trống'})
  password: string;

  @IsString()
  @IsNotEmpty({message: 'Họ và tên không được để trống'})
  @MinLength(2, {message: 'Họ và tên phải có ít nhất 2 ký tự'})
  @MaxLength(50, {message: 'Họ và tên không được vượt quá 50 ký tự'})
  name: string;

  @IsDateString()
  @IsNotEmpty({message: 'Ngày sinh không được để trống'})
  dob: Date;

  @IsNotEmpty({message: 'Giới tính không được để trống'})
  @IsEnum(Gender, {message: 'Giới tính phải là một trong các giá trị: male, female, other'})
  gender: Gender;

  @IsNumber()
  @IsNotEmpty({message: 'Tỉnh/Thành phố không được để trống'})
  @IsInt({message: 'Mã tỉnh/thành phố phải là số nguyên'})
  @IsPositive({message: 'Mã tỉnh/thành phố phải là số dương'})
  province_id: number;

  @IsNumber()
  @IsNotEmpty({message: 'Quận/Huyện không được để trống'})
  @IsInt({message: 'Mã Quận/Huyện phải là số nguyên'})
  @IsPositive({message: 'Mã Quận/Huyện phải là số dương'})
  district_id: number;

  @IsNumber()
  @IsNotEmpty({message: 'Xã/Phường không được để trống'})
  @IsInt({message: 'Mã Xã/Phường phải là số nguyên'})
  @IsPositive({message: 'Mã Xã/Phường phải là số dương'})
  ward_id: number;

}

