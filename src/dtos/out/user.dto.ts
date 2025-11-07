import { UserRole } from '@prisma/client';
import { IsEnum, IsISO8601, IsNumber, IsString, IsBoolean } from 'class-validator';

export class UserOutDTO {
  @IsNumber()
  userId: number;

  @IsISO8601()
  registrationDate: string;

  @IsBoolean()
  userDrop: boolean;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  fullname: string;
}

export class UserAllOutDTO {
  @IsNumber()
  userId: number;

  @IsString()
  dni: string;

  @IsString()
  address?: string | null;

  @IsString()
  city?: string | null;

  @IsString()
  province?: string | null;

  @IsString()
  postalCode?: string | null;

  @IsString()
  country?: string | null;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsISO8601()
  registrationDate: string;

  @IsBoolean()
  userDrop: boolean;

  @IsNumber()
  daysDisciplinary: number;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  fullname: string;
}

export class UserDropOutDTO {
  @IsString()
  message: string;

  @IsNumber()
  userId: number;

  @IsBoolean()
  userDrop: boolean;
}
