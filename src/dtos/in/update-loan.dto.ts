import { IsOptional, IsNumber, IsString, Matches } from 'class-validator'

export class UpdateLoanDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Return date must be in format YYYY-MM-DD' })
  returnDate?: string

  @IsOptional()
  @IsNumber({}, { message: 'User ID must be a number' })
  userId?: number

  @IsOptional()
  @IsString({ message: 'ISBN must be a string' })
  isbn?: string
}
