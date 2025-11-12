import { UserRole } from '@prisma/client'
import { IsEnum, IsISO8601, IsNumber, IsString, IsBoolean } from 'class-validator'

export class UserDto {
  @IsNumber()
  userId: number

  @IsISO8601()
  registrationDate: string

  @IsBoolean()
  userDrop: boolean

  @IsEnum(UserRole)
  role: UserRole

  @IsString()
  fullname: string
}
