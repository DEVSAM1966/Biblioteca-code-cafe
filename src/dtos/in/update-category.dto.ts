import { IsString, IsOptional } from 'class-validator'

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  nameCategory?: string

  @IsOptional()
  @IsString()
  subtopicCategory?: string | null
}
