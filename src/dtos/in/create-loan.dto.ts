import { IsNumber, IsString, IsOptional, IsDate, MinDate } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateLoanDto {
  @IsNumber()
  userId: number

  @IsString()
  isbn: string

  @IsOptional()
  @IsDate()
  @MinDate(() => new Date())
  @Type(() => Date)
  returnDate?: Date
}
