import { IsString, MinLength, MaxLength } from 'class-validator'

export class UpdateAuthorDto {
  @IsString({ message: 'Author Name must be a string' })
  @MinLength(2, { message: 'Author Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Author Name must be at most 100 characters long' })
  nameAuthor: string
}
