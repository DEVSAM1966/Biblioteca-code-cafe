import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class UserIdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive integer' })
  id: number
}
