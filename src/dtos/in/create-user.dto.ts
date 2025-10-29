import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  dni: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  province?: string;

  @IsPostalCode("any")
  @IsOptional()
  @MaxLength(20)
  postalCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  country?: string;

  @IsPhoneNumber()
  @MaxLength(50)
  phone: string;

  @IsEmail()
  @MaxLength(120)
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 1,
  })
  @MaxLength(25)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullname: string;

  @IsEnum(UserRole)
  role: UserRole

  @IsNumber()
  @IsOptional()
  daysDisciplinary?: number
}