import { IsString, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class CategoryNameDto {
  @Type(() => String)
  @IsString({ message: 'Category name must be a string' })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'Category name can only contain letters and spaces',
  })
  name: string
}
