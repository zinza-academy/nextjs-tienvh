import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ChangePassWordToken implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body.token;

    if (!token) {
      throw new UnauthorizedException('Reset token is required');
    }

    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
