import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

export class LoginInDto {
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
}
