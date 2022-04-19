import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  IsEnum,
  IsNumberString
} from 'class-validator';
import { CAR_SIZE_ENUM } from '../../constant/common';

export class RegistrationPlatesDto {
  @IsNotEmpty()
  @IsNumberString()
  parkingLotId: number;

  @IsNotEmpty()
  @IsEnum(CAR_SIZE_ENUM)
  carSize: CAR_SIZE_ENUM;
}