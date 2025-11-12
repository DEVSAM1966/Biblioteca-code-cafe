import type { UserRole } from '@prisma/client'
import type { JwtPayload } from 'jsonwebtoken'

export type AuthorizationTokenPayload = JwtPayload & {
  sub: number
  role: UserRole
}
