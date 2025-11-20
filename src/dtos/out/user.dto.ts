import { UserRole } from '@prisma/client'
import { IsEnum, IsISO8601, IsNumber, IsString, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'

export class UserDto {
  @IsNumber()
  userId: number

  @IsISO8601()
  @Transform(({ value }) => value.split('T')[0])
  registrationDate: string

  @IsBoolean()
  userDrop: boolean

  @IsEnum(UserRole)
  role: UserRole

  @IsString()
  fullname: string
}
