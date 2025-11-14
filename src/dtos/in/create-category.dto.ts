import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator'

export class CreateCategoryDto {
  @IsString({ message: 'Category Name must be a string' })
  @MinLength(3, { message: 'Category Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Category Name must be at most 30 characters long' })
  nameCategory: string

  @IsOptional()
  @IsString({ message: 'Category Subtopic must be a string' })
  subtopicCategory?: string | null
}
