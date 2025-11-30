import { IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class HistoryIdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'loanId must be an integer' })
  @Min(1, { message: 'loanId must be a positive integer' })
  id: number
}
