import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'common/utils/response.util';
import { addMinutes, isBefore } from 'date-fns';
import { MailService } from 'modules/mail/mail.service';
import { ReceiveUserDto } from 'modules/users/dto/users.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async login(loginDto: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }

  async register(registerDto: RegisterDTO): Promise<ApiResponse<ReceiveUserDto>>{
    return this.usersService.create(registerDto);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDTO): Promise<void> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) throw new NotFoundException('User not found');
    const token = uuidv4();
    const expiry = addMinutes(new Date(), 5);
    await this.usersService.updateResetToken(user.id, token, expiry);
    await this.mailService.sendForgotPasswordEmail(user.email, token);
    return token;
  }
 
  async changePassword(changePasswordDto: ChangePasswordDTO): Promise<void> {
    const user = await this.usersService.findByResetToken(changePasswordDto.token);
    if (!user || !user.resetTokenExpiry || isBefore(user.resetTokenExpiry, new Date())) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    const token = null;
    const expiry = null;
    await this.usersService.updateResetToken(user.id, token, expiry);
    await this.usersService.updatePassword(user.id,user.password);
  }
}
