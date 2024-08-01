import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { BaseAuthGuard } from "./auth.guard";
import { Reflector } from "@nestjs/core";
import { Role } from "common/enums/user.enum";
import { Users } from "entities/users.entity";

@Injectable()
export class RolesGuard extends BaseAuthGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  canActivate(context: ExecutionContext) {
    const allowedRoles = this.reflector.get<Role[]>(
      'AllowedRoles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user as Users;

    if (!user) return super.canActivate(context);
    if (!allowedRoles) return super.canActivate(context);

    const hasRole = allowedRoles.includes(user.role);

    if (hasRole) return true;

    return super.canActivate(context);
  }
}
