import { IsString, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class UserNameDto {
  @Type(() => String)
  @IsString({ message: 'User Fullname must be a string' })
  @Matches(/^[a-zA-Z\s-]{3,100}$/, {
    message:
      'User Fullname must be 3-100 characters long and can only contain letters, spaces, and hyphens',
  })
  name: string
}
