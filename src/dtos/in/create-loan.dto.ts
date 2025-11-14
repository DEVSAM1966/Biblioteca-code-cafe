import { IsNumber, IsString, IsOptional, Matches } from 'class-validator'

export class CreateLoanDto {
  @IsNumber({}, { message: 'Loan User ID must be a number' })
  userId: number

  @IsString({ message: 'Loan ISBN must be a string' })
  isbn: string

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Loan date must be in format YYYY-MM-DD' })
  loanDate: string

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Return date must be in format YYYY-MM-DD' })
  returnDate?: string
}
