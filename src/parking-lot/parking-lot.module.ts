import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLotService } from './parking-lot.service';
import { ParkingModule } from '../parking/parking.module';

import { ParkingLotRepository } from './parking-lot.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ParkingLotRepository
    ]),
    ParkingModule
  ],
  providers: [ParkingLotService],
  exports: [ParkingLotService],
})
export class ParkingLotModule {}
