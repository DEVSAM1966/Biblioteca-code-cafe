import { IsNumber, IsString, IsISO8601, IsOptional } from 'class-validator'

export class BookDto {
  @IsString()
  isbn: string

  @IsString()
  title: string

  @IsNumber()
  @IsOptional()
  pages?: number | null

  @IsString()
  @IsOptional()
  summary?: string | null

  @IsISO8601()
  @IsOptional()
  editionDate?: string | null

  @IsString()
  @IsOptional()
  bookCover?: string | null

  @IsString()
  @IsOptional()
  bookFile?: string | null

  @IsString()
  @IsOptional()
  language?: string | null

  @IsNumber()
  authorId?: number | null

  @IsString()
  @IsOptional()
  authors?: string | null

  @IsNumber()
  publisherId?: number | null

  @IsNumber()
  categoryId?: number | null
}
