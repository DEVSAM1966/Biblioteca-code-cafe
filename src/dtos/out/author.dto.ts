import { IsNumber, IsString } from 'class-validator'

export class AuthorDto {
  @IsNumber()
  authorId: number

  @IsString()
  nameAuthor: string
}
