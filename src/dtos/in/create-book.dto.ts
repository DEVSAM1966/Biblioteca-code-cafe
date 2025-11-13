import { IsInt, IsOptional, IsString, IsDateString, MaxLength } from 'class-validator'

export class CreateBookDto {
  @IsString()
  @MaxLength(13)
  isbn: string

  @IsString()
  @MaxLength(55)
  title: string

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
  @MaxLength(20)
  language?: string

  @IsOptional()
  @IsString()
  @MaxLength(100)
  authors?: string

  @IsInt()
  authorId: number

  @IsInt()
  publisherId: number

  @IsInt()
  categoryId: number
}
