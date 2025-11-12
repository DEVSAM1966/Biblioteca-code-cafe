import { IsNumber, IsString, IsOptional } from 'class-validator'

export class CategoryDto {
  @IsNumber()
  categoryId: number

  @IsString()
  nameCategory: string

  @IsOptional()
  @IsString()
  subtopicCategory?: string | null
}
