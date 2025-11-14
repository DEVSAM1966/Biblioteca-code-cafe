import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class LoanIdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'Loan ID must be an integer' })
  @Min(1, { message: 'ID must be greater than 0' })
  id: number
}
