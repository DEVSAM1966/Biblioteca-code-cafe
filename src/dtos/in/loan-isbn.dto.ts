import { IsString, Matches } from 'class-validator'

export class LoanIsbnDto {
  @IsString({ message: 'Loan ISBN must be a string' })
  @Matches(/^(?:\d{9}[\dXx]|\d{13})$/, {
    message: 'Loan ISBN must be either 10 digits (last can be X) or 13 digits',
  })
  id: string
}
