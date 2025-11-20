import { UserRole } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserDto {
  @IsString({ message: 'User DNI must be a string' })
  @MaxLength(20, { message: 'User DNI must be at most 20 characters long' })
  dni: string

  @IsString({ message: 'User Address must be a string' })
  @IsOptional()
  @MaxLength(100, { message: 'User Address must be at most 100 characters long' })
  address?: string

  @IsString({ message: 'User City must be a string' })
  @IsOptional()
  @MaxLength(40, { message: 'User City must be at most 40 characters long' })
  city?: string

  @IsString({ message: 'User Province must be a string' })
  @IsOptional()
  @MaxLength(30, { message: 'User Province must be at most 30 characters long' })
  province?: string

  @IsPostalCode('any', { message: 'User Postal code must be valid' })
  @IsOptional()
  @MaxLength(20, { message: 'User Postal code must be at most 20 characters long' })
  postalCode?: string

  @IsString({ message: 'User Country must be a string' })
  @IsOptional()
  @MaxLength(30, { message: 'User Country must be at most 30 characters long' })
  country?: string

  @IsPhoneNumber(undefined, { message: 'User Phone must be valid' })
  @MaxLength(50, { message: 'User Phone must be at most 50 characters long' })
  phone: string

  @IsEmail(
    { require_tld: true, allow_ip_domain: false },
    { message: 'User Email must be valid and contain @ and a domain (e.g. user@example.com)' },
  )
  @MaxLength(120, { message: 'User Email must be at most 120 characters long' })
  email: string

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 2,
      minUppercase: 2,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: 'User Password must be strong: min 8 chars, 2 lowercase, 2 uppercase, 1 number' },
  )
  @MaxLength(25, { message: 'User Password must be at most 25 characters long' })
  password: string

  @IsString({ message: 'User Fullname must be a string' })
  @IsNotEmpty({ message: 'User Fullname cannot be empty' })
  @MaxLength(100, { message: 'User Fullname must be at most 100 characters long' })
  fullname: string

  @IsEnum(UserRole, { message: 'User Role must be a valid UserRole' })
  role: UserRole

  @Type(() => Number)
  @IsNumber({}, { message: 'User Days disciplinary must be a number' })
  @IsOptional()
  daysDisciplinary?: number
}
