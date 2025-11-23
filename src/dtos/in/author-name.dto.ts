import { IsString, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class AuthorNameDto {
  @Type(() => String)
  @IsString({ message: 'Author name must be a string' })
  @Matches(/^[a-zA-Z\s.]+$/, {
    message: 'Author name can only contain characters, spaces and dots',
  })
  name: string
}
