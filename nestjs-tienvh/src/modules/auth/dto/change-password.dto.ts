import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty({message: 'Token không được để trống'})
  token: string;

  @IsString()
  @MinLength(8, {message:'Mật khẩu phải có ít nhất 8 kí tự'})
  @MaxLength(64, {message: 'Mật khẩu không vượt quá 64 kí tự'})
  @Matches(/^[^\s]+$/, { message: 'Mật khẩu không được chứa dấu cách' })
  @IsNotEmpty({message: 'Mật khẩu không được để trống'})
  newPassword: string;
}
