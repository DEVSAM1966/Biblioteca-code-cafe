import { IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class PublisherNameDto {
  @Type(() => String)
  @IsString({ message: 'Name must be a string' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name can only contain letters and spaces',
  })
  name: string;
}