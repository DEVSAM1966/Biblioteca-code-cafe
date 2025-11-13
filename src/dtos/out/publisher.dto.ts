import { IsNumber, IsOptional, IsPhoneNumber, IsPostalCode, IsString } from 'class-validator'

export class PublisherDto {
  @IsNumber()
  publisherId: number

  @IsString()
  namePublisher: string

  @IsString()
  @IsOptional()
  address: string | null

  @IsString()
  @IsOptional()
  city: string | null

  @IsString()
  @IsOptional()
  province: string | null

  @IsPostalCode()
  @IsOptional()
  postalCode: string | null

  @IsString()
  @IsOptional()
  country: string | null

  @IsPhoneNumber()
  @IsOptional()
  phone: string | null

  @IsString()
  @IsOptional()
  notes: string | null
}
