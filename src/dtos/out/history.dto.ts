import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator'

export class HistoryDTO {
  @IsNumber()
  historyId: number

  @IsOptional()
  @IsNumber()
  loanId?: number | null

  @IsOptional()
  @IsDateString()
  dateFeedback?: string | null

  @IsOptional()
  @IsString()
  feedback?: string | null
}
