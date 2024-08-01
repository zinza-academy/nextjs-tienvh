import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  @IsNotEmpty({message: 'Email không được để trống'})
  @MaxLength(255)
  email: string;
}
