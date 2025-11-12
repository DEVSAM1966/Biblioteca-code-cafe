import { IsInt, IsOptional, IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class CreatePublisherDto {
  @IsInt({ message: 'Publisher ID must be an integer' })
  publisherId: number;

  @IsString({ message: 'Publisher - Name must be a string' })
  @MinLength(2, { message: 'Publisher - Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Publisher - Name must be at most 100 characters long' })
  namePublisher: string;

  @IsOptional()
  @IsString({ message: 'Publisher - Address must be a string' })
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - City must be a string' })
  @MaxLength(40)
  city?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - Province must be a string' })
  @MaxLength(30)
  province?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[0-9A-Za-z-]+$/, { message: 'Publisher - Postal code format is invalid' })
  postalCode?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - Country must be a string' })
  @MaxLength(30)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  @Matches(/^[0-9+\-\s]+$/, { message: 'Publisher - Phone number format is invalid' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}

export class UpdatePublisherDto {
  @IsOptional()
  @IsString({ message: 'Publisher - Name must be a string' })
  @MinLength(2, { message: 'Publisher - Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Publisher - Name must be at most 100 characters long' })
  namePublisher?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - Address must be a string' })
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - City must be a string' })
  @MaxLength(40)
  city?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - Province must be a string' })
  @MaxLength(30)
  province?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[0-9A-Za-z-]+$/, { message: 'Publisher - Postal code format is invalid' })
  postalCode?: string;

  @IsOptional()
  @IsString({ message: 'Publisher - Country must be a string' })
  @MaxLength(30)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  @Matches(/^[0-9+\-\s]+$/, { message: 'Publisher - Phone number format is invalid' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}
