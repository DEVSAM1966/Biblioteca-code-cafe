import { UserRole } from '@prisma/client';

export type JWTUser = {
  id: number;
  role: UserRole;
};
