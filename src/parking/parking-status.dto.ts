import {
  IsNumber,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  IsEnum,
} from 'class-validator';

import { CAR_SIZE_ENUM, STATUS_ENUM } from '../constant/common';

export class ParkingStatusDto {
  @IsNotEmpty()
  @IsNumber()
  parkingLotId: number;

  @IsNotEmpty()
  @IsNumber()
  parkingId: number;

  @IsNotEmpty()
  @IsEnum(CAR_SIZE_ENUM)
  carSize: CAR_SIZE_ENUM;

  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}