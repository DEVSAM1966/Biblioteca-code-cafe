import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class AuthorIdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'Author ID must be an integer' })
  @Min(1, { message: 'Author ID must be a positive integer' })
  id: number
}
