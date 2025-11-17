import { IsOptional, IsString, MaxLength, IsInt, Matches } from 'class-validator'
import { Type } from 'class-transformer';

export class UpdateBookDto {
  @IsOptional()
  @IsString({ message: 'Book title must be a string' })
  @MaxLength(55, { message: 'Book title must be at most 55 characters long' })
  title?: string

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
  @IsString({ message: 'Book Cover must be a string' })
  @MaxLength(255, { message: 'Book cover must be at most 255 characters long' })
  bookCover?: string

  @IsOptional()
  @IsString({ message: 'Book File must be a string' })
  @MaxLength(255, { message: 'Book file must be at most 255 characters long' })
  bookFile?: string

  @IsOptional()
  @IsString({ message: 'Book Language must be a string' })
  @MaxLength(20, { message: 'Book Language must be at most 20 characters long' })
  language?: string

  @IsOptional()
  @IsString({ message: 'Book Authors must be a string' })
  @MaxLength(100, { message: 'Book Authors must be at most 100 characters long' })
  authors?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Book Author ID must be an integer' })
  authorId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Book Publisher ID must be an integer' })
  publisherId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Book Category ID must be an integer' })
  categoryId?: number
}
