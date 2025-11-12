import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateBookFilesDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  bookCover?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  bookFile?: string
}
