import {
  IsNumber,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class ParkingDto {
  @IsNotEmpty()
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