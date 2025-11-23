import { UnauthorizedError } from '../models/errors/unauthorized.error'
import { ForbiddenError } from '../models/errors/forbidden.error'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { getTokenFrom } from '../utilities/get-token-from.utility'
import type { Response, Request, NextFunction } from 'express'
import { AuthService } from '../services/auth.service'
import type { UserRole } from '@prisma/client'

export function authMiddleware(...allowedRoles: UserRole[]) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const authorizationHeader = request.headers.authorization

    if (!authorizationHeader) throw new UnauthorizedError('No token provided')

    const token = getTokenFrom(authorizationHeader)

    if (!token) throw new UnauthorizedError('Malformed token')

    try {
      const payload = AuthService.getPayloadOf(token)

      if (!payload.sub || !payload.role) {
        throw new UnauthorizedError('Invalid token payload')
      }

      request.user = { id: payload.sub, role: payload.role }

      // NUEVO: si no se pasan roles → solo autenticación
      if (allowedRoles.length === 0) return next()

      // NUEVO: si se pasan roles → validar rol o ADMIN
      if (payload.role === 'ADMIN' || allowedRoles.includes(payload.role as UserRole)) {
        return next()
      }

      throw new ForbiddenError(`Access denied for role ${payload.role}`)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError('Token expired')
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError('Malformed token')
      }

      throw new UnauthorizedError('Invalid token')
    }
  }
}
