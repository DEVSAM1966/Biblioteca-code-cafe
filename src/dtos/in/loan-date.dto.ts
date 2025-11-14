import { IsString, Matches } from 'class-validator'

export class LoanDateDto {
  @IsString({ message: 'Loan Date must be a string' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Loan Date must be in format YYYY-MM-DD' })
  date: Date
}
