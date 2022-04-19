import { Controller, Get, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';

import { ParkingLotService } from './parking-lot.service';
import { ParkingLotDto } from './parking-lot.dto';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(
    private readonly parkingLotService: ParkingLotService,
  ) {}

    @Get()
    getHello(): string {
      this.parkingLotService.listAll();
      return 'okkkk2'
    }

    @Post('')
    create( @Body() body: ParkingLotDto ) {
      return this.parkingLotService.create(body);
    }
}
