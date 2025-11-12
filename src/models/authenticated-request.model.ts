import type { Request } from 'express'
import type { JWTUser } from './jwt-user.model'

export interface AuthenticatedRequest extends Request {
  user: JWTUser
}
