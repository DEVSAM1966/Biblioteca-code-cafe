import { IsNumber, IsString, IsOptional, IsDate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLoanDTO {
  @IsNumber()
  userId: number;

  @IsString()
  isbn: string;

  @IsOptional()
  @IsDate()
  @MinDate(() => new Date())
  @Type(() => Date)
  returnDate?: Date;
}

export class UpdateLoanDTO {
  @IsOptional()
  @IsDate()
  @MinDate(() => new Date())
  @Type(() => Date)
  returnDate?: Date;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  isbn?: string;
}
