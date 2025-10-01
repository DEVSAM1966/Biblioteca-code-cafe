import {
  IsBtcAddress,
  IsNumber,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from "class-validator";

export class PublisherOutDTO {
  @IsNumber()
  publisher_id: number;

  @IsString()
  name_publisher: string;

  @IsBtcAddress()
  address?: string;

  @IsString()
  city?: string;

  @IsString()
  province?: string;

  @IsPostalCode()
  postal_code?: string;

  @IsString()
  country?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsString()
  notes?: string;
}
