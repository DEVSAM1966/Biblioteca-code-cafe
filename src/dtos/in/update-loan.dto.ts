import { Type } from 'class-transformer'
import { IsOptional, IsDate, MinDate, IsNumber, IsString } from 'class-validator'

export class UpdateLoanDto {
  @IsOptional()
  @IsDate()
  @MinDate(() => new Date())
  @Type(() => Date)
  returnDate?: Date

  @IsOptional()
  @IsNumber()
  userId?: number

  @IsOptional()
  @IsString()
  isbn?: string
}
