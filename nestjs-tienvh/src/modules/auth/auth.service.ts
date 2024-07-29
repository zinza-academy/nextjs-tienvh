import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiResponse } from 'common/utils/response.util';
import { ReceiveUserDto } from 'modules/users/dto/users.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { MailService } from 'modules/mail/mail.service';
import { Users } from 'entities/users.entity';
import { ChangePasswordDTO } from './dto/change-password.dto';

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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDTO){
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) throw new NotFoundException('User not found');
    const token = await this.generateResetToken(user);
    await this.mailService.sendForgotPasswordEmail(user.email, token);
    return token;
  }
 
  async changePassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findById(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await this.usersService.updatePassword(user.id, hashedPassword);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Invalid or expired token');
    }
  }

  async generateResetToken(user: Users) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, { expiresIn: '5m' });
  }
}
