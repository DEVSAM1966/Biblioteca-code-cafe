import { UserRole } from '@prisma/client';
import { JWTUser } from './jwt-user.model';
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: JWTUser;
    }
  }
}
