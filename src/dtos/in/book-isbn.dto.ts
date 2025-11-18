import { IsString, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class BookIsbnDto {
  @Type(() => String)
  @IsString({ message: 'Book ISBN must be a string' })
  @Matches(/^(?:\d{9}[\dXx]|\d{13})$/, {
    message: 'Book ISBN must be either 10 digits (last can be X) or 13 digits',
  })
  isbn: string
}
