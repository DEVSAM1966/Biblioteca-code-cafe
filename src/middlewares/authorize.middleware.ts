import type { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../models/errors/forbidden.error'
import { UnauthorizedError } from '../models/errors/unauthorized.error'
import { UserRole } from '@prisma/client'

export function authorize(allowedRoles: UserRole[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        // Verificamos que el middleware de autenticación ya haya insertado el usuario
        if (!req.user) {
            throw new UnauthorizedError('No authenticated user found')
        }

        const { role } = req.user

        // Validamos el rol contra la lista permitida
        if (!allowedRoles.includes(role)) {
            throw new ForbiddenError(`Access denied for role ${role}`)
        }

        // Si todo está correcto, continuamos
        next()
    }
}