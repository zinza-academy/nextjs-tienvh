  import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';

  export class LoginDTO {
    @IsEmail()
    @IsNotEmpty({message: 'Email không được để trống'})
    @MaxLength(255)
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Mật khẩu không được để trống'})
    @MinLength(8, {message:'Mật khẩu phải có ít nhất 8 kí tự'})
    password: string;
  }
