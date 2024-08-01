import { SetMetadata } from '@nestjs/common';
import { Role } from 'common/enums/user.enum';

export const AllowedRoles = (...roles: Role[]) =>
  SetMetadata('AllowedRoles', roles);
