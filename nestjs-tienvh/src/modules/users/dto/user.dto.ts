import { IsString, IsEmail, MinLength, IsNumberString, Length, IsNotEmpty, IsAlphanumeric, Matches, IsDate, IsNumber, IsDateString } from 'class-validator';

export class CreateUserDto {

  @IsNumberString()
  @Matches(/^\d{9}$|^\d{12}$/,{message: 'CMND/CCCD phải có 9 hoặc 12 số'})
  @IsNotEmpty({message: 'CMND/CCCD không được để trống'})
  cmt: string

  @IsEmail()
  @IsNotEmpty({message: 'Email không được để trống'})
  email: string;

  @IsString()
  @MinLength(8, {message:'Mật khẩu phải có ít nhất 8 kí tự'})
  @Matches(/^[^\s]+$/, { message: 'Mật khẩu không được chứa dấu cách' })
  @IsNotEmpty({message: 'Mật khẩu không được để trống'})
  password: string;

  @IsString()
  @IsNotEmpty({message: 'Họ và tên không được để trống'})
  name: string;

  @IsDateString()
  @IsNotEmpty({message: 'Ngày sinh không được để trống'})
  dob: Date;

  @IsString()
  @IsNotEmpty({message: 'Giới tính không được để trống'})
  gender: string;

  @IsNumber()
  @IsNotEmpty({message: 'Tỉnh/Thành phố không được để trống'})
  province: number;

  @IsNumber()
  @IsNotEmpty({message: 'Quận/Huyện không được để trống'})
  district: number;

  @IsNumber()
  @IsNotEmpty({message: 'Xã/Phường không được để trống'})
  ward: number;

}

export class ListUsersDto {
  id: number;
  cmt: string;
  email: string;
  name: string;
  dob: Date;
  gender: string;
  province: number;
  district: number;
  ward: number;
}
