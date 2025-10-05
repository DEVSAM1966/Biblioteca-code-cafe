import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  MaxLength,
} from "class-validator";

export class RegisterInDto {
  @IsString()
  @MaxLength(20)
  dni: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  address: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(40)
  city: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  province: string | null;

  @IsPostalCode()
  @IsOptional()
  @MaxLength(20)
  postalCode: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  country: string | null;

  @IsPhoneNumber()
  @MaxLength(50)
  phone: string;

  @IsEmail()
  @MaxLength(120)
  email: string;

  @IsString()
  @MaxLength(25)
  password: string;

  @IsString()
  @MaxLength(100)
  fullname: string;
}
