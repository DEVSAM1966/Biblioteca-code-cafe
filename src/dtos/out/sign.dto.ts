import type { UserDto } from './user.dto'

export class SignDto {
  user: UserDto
  authorization: string
}
