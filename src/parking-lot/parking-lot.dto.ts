import {
  IsNumber,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
} from 'class-validator';

export class ParkingLotDto {
  @IsNotEmpty()
  @MaxLength(250)
  name: number;

  @IsNotEmpty()
  @IsNumber()
  parkingSmall: number;

  @IsNotEmpty()
  @IsNumber()
  parkingMedium: number;

  @IsNotEmpty()
  @IsNumber()
  parkingLarge: number;
}