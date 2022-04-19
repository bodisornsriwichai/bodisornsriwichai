import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class RegistrationCheckoutDto {
  @IsNotEmpty()
  @IsNumber()
  parkingLotId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  plateNumber: string;
}