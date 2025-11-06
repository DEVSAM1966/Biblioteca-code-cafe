import { UserRole } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type AuthorizationTokenPayload = JwtPayload & {
  sub: number;
  role: UserRole;
};
