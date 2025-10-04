import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from "class-validator";

export class RegisterInDto {
  @IsString()
  dni: string;

  @IsString()
  @IsOptional()
  address: string | null;

  @IsString()
  @IsOptional()
  city: string | null;

  @IsString()
  @IsOptional()
  province: string | null;

  @IsPostalCode()
  @IsOptional()
  postalCode: string | null;

  @IsString()
  @IsOptional()
  country: string | null;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullname: string;
}
