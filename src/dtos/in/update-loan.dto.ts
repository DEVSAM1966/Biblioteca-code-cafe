import { IsOptional, IsNumber, IsString, Matches, Min } from 'class-validator'

export class UpdateLoanDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Return date must be in format YYYY-MM-DD' })
  returnDate?: string

  @IsOptional()
  @IsNumber({}, { message: 'User ID must be a number' })
  @Min(1, { message: 'User ID must be a positive integer' })
  userId?: number

  @IsOptional()
  @IsString({ message: 'Book ISBN must be a string' })
  @Matches(/^(?:\d{9}[\dXx]|\d{13})$/, {
    message: 'Book ISBN must be either 10 digits (last can be X) or 13 digits',
  })
  isbn?: string
}
