import { IsOptional, IsString, MaxLength, IsInt, IsDateString } from 'class-validator'

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MaxLength(55)
  title?: string

  @IsOptional()
  @IsInt()
  pages?: number

  @IsOptional()
  @IsString()
  @MaxLength(255)
  summary?: string

  @IsOptional()
  @IsDateString()
  editionDate?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bookCover?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bookFile?: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  language?: string

  @IsOptional()
  @IsString()
  @MaxLength(100)
  authors?: string

  @IsOptional()
  @IsInt()
  authorId?: number

  @IsOptional()
  @IsInt()
  publisherId?: number

  @IsOptional()
  @IsInt()
  categoryId?: number
}
