  import { Body, Controller, Get, HttpStatus, Post, Res, ValidationPipe,Query, UseGuards, Param } from '@nestjs/common';
import { ApiResponse, createResponse } from 'common/utils/response.util';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-route.decorator';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ReceiveUserDto } from 'modules/users/dto/users.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ChangePassWordToken} from './guard/change-password.guard';
import { ChangePasswordDTO } from './dto/change-password.dto';
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body(ValidationPipe) loginDto: LoginDTO, @Res({ passthrough: true }) res: Response) {
      const { access_token } = await this.authService.login(loginDto);
      res.cookie('access_token', access_token, {
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000
      });
      return createResponse(null, 'Login successful', HttpStatus.OK);
    }
  
    @Post('logout')
    async logOut(@Res({ passthrough: true }) res: Response) {
      res.clearCookie('access_token');
      return createResponse(null, 'Logout successful', HttpStatus.OK);
    }

    @Public()
    @Post('register')
    async register(@Body(ValidationPipe) registerDto: RegisterDTO): Promise<ApiResponse<ReceiveUserDto>> {
      const result = await this.authService.register(registerDto);
      return createResponse(result.data, 'Registration successful', HttpStatus.CREATED);
    }

    @Public()
    @Post('forgot-password')
    async forgotPassword(@Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDTO) {
      const token = await this.authService.forgotPassword(forgotPasswordDto);
      return { token: token };
    }

    @Public()
    @UseGuards(ChangePassWordToken)
    @Post('change-password')
    async changePassword(
      @Query('token') token: string,
      @Body(ValidationPipe) changePasswordDto: ChangePasswordDTO
    ) {
      await this.authService.changePassword(token, changePasswordDto.newPassword);
      return { message: 'Password changed successfully' };
    }
  
  }

