import { IsInt, IsOptional, IsString, Matches, MaxLength } from 'class-validator'
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString({ message: 'Book ISBN must be a string' })
  @Matches(/^(?:\d{9}[\dXx]|\d{13})$/, {
    message: 'Book ISBN must be either 10 digits (last can be X) or 13 digits',
  })
  isbn: string

  @IsString({ message: 'Book Title must be a string' })
  @MaxLength(55, { message: 'Book Title must be at most 55 characters long' })
  title: string

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Book Pages must be an integer' })
  pages?: number

  @IsOptional()
  @IsString({ message: 'Book Summary must be a string' })
  @MaxLength(255, { message: 'Book Summary must be at most 255 characters long' })
  summary?: string

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Book Edition date must be in format YYYY-MM-DD' })
  editionDate?: string

  @IsOptional()
  @IsString({ message: 'Book Language must be a string' })
  @MaxLength(20, { message: 'Language must be at most 20 characters long' })
  language?: string

  @IsOptional()
  @IsString({ message: 'Book Authors must be a string' })
  @MaxLength(100, { message: 'Book Authors must be at most 100 characters long' })
  authors?: string

  @Type(() => Number)
  @IsInt({ message: 'Book Author ID must be an integer' })
  authorId: number

  @Type(() => Number)
  @IsInt({ message: 'Book Publisher ID must be an integer' })
  publisherId: number

  @Type(() => Number)
  @IsInt({ message: 'Book Category ID must be an integer' })
  categoryId: number
}
