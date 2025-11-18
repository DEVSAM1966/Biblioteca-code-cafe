import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateBookFilesDto {
  @IsOptional()
  @IsString({ message: 'Book Cover path must be a string' })
  @MaxLength(255, { message: 'Book Cover path must be at most 255 characters long' })
  bookCover?: string

  @IsOptional()
  @IsString({ message: 'Book File path must be a string' })
  @MaxLength(255, { message: 'Book file path must be at most 255 characters long' })
  bookFile?: string
}
