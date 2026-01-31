import type { UserRole } from '@prisma/client'

declare global {
  namespace Express {
    interface UserPayload {
      id: number
      role: UserRole
    }

    interface Request {
      user: UserPayload
    }
  }
}
