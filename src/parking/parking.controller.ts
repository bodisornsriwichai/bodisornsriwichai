import { Controller, Get, Post, Body, Param, ValidationPipe, UsePipes } from '@nestjs/common';

import { ParkingService } from './parking.service';
import { ParkingStatusDto } from './parking-status.dto';

@Controller('parking')
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
  ) {}

    @Post('/status')
    listById(@Body() body: ParkingStatusDto) {
      const { parkingLotId, parkingId, carSize, status } = body;
      return this.parkingService.updateStatus(parkingLotId, parkingId, carSize, status);
    }

}
