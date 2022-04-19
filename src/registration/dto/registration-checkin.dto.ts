import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { CAR_SIZE_ENUM } from '../../constant/common';

export class RegistrationCheckinDto {
  @IsNotEmpty()
  @IsNumber()
  parkingLotId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  plateNumber: string;

  @IsNotEmpty()
  @IsEnum(CAR_SIZE_ENUM)
  carSize: CAR_SIZE_ENUM;
}