import { IsInt, IsOptional, IsString, MinLength, MaxLength, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateHistoryDto {
  @Type(() => Number)
  @IsInt({ message: 'Loan ID must be an integer' })
  loanId: number

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Book Edition date must be in format YYYY-MM-DD' })
  dateFeedback: string

  @IsString({ message: 'Feedback must be a string' })
  @MinLength(10, { message: 'Feedback must be at least 10 characters long' })
  @MaxLength(255, { message: 'Feedback must be at most 255 characters long' })
  feedback: string
}
