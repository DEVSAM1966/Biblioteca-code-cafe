import {
  IsNumber,
  IsString,
  IsOptional,
  IsISO8601
} from "class-validator";

export class LoanOutDTO {

    @IsNumber()
    loanId: number;

    @IsOptional()
    @IsISO8601()
    loanDate?: string | null;

    @IsOptional()
    @IsISO8601()
    returnDate?: string | null;

    @IsNumber()
    @IsOptional()
    userId?: number | null;
    
    @IsString()
    @IsOptional()
    isbn?: string | null;

}
