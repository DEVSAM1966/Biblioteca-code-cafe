import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePublisherDto {
  @IsInt()
  publisher_id: number;

  @IsString()
  @MaxLength(100)
  name_publisher: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  province?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  postal_code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(16)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}
