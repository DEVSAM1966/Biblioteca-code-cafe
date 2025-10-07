import { IsEmail, IsString, MaxLength } from "class-validator";

export class LoginInDto {
  @IsEmail()
  @MaxLength(120)
  email: string;

  @IsString()
  @MaxLength(25)
  password: string;
}
