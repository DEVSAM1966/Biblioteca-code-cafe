import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class CategoryIdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'Category ID must be an integer' })
  @Min(1, { message: 'Category ID must be a positive integer' })
  id: number
}
