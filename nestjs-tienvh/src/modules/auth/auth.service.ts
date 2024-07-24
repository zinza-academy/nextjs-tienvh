import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiResponse } from 'common/utils/response.util';
import { ReceiveUserDto } from 'modules/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
}
