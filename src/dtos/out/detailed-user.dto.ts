import { UserRole } from '@prisma/client'
import { IsNumber, IsString, IsISO8601, IsBoolean, IsEnum } from 'class-validator'
import { Transform } from 'class-transformer'

export class DetailedUserDto {
  @IsNumber()
  userId: number

  @IsString()
  dni: string

  @IsString()
  address?: string | null

  @IsString()
  city?: string | null

  @IsString()
  province?: string | null

  @IsString()
  postalCode?: string | null

  @IsString()
  country?: string | null

  @IsString()
  phone: string

  @IsString()
  email: string

  @IsISO8601()
  @Transform(({ value }) => value.split('T')[0])
  registrationDate: string

  @IsBoolean()
  userDrop: boolean

  @IsNumber()
  daysDisciplinary: number

  @IsEnum(UserRole)
  role: UserRole

  @IsString()
  fullname: string
}
