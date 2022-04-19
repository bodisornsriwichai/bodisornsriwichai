import { Controller, Get, Post, Body, Param, ValidationPipe, UsePipes } from '@nestjs/common';

import { ParkingLotService } from './parking-lot.service';
import { ParkingLotDto } from './parking-lot.dto';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(
    private readonly parkingLotService: ParkingLotService,
  ) {}

    @Get(':id')
    listById(@Param() params) {
      let { id } = params;
      return this.parkingLotService.getParkingLot(id);
    }

    @Post('')
    create( @Body() body: ParkingLotDto ) {
      return this.parkingLotService.create(body);
    }
}
