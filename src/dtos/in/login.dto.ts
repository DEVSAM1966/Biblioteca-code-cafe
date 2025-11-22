import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @MaxLength(120)
  email: string

  @IsString()
  @MinLength(8,{ message: 'Password must be at least 8 characters long' })
  @MaxLength(120, { message: 'Password must be shorter than or equal to 120 characters' })
  password: string
}
