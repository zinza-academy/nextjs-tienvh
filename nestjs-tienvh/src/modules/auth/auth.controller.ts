  import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { createResponse } from 'common/utils/response.util';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-route.decorator';
import { LoginDTO } from './dto/login.dto';
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDTO, @Res({ passthrough: true }) res: Response) {
      const { access_token } = await this.authService.login(loginDto);
      
      res.cookie('access_token', access_token, {
        // httpOnly: true,
        // secure: true, 
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
  }
