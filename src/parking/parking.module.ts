import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingService } from './parking.service';

import { ParkingRepository } from './parking.repository';

@Module({
  imports:[TypeOrmModule.forFeature([
    ParkingRepository
  ])],
  providers: [ParkingService],
  exports: [ParkingService],
})
export class ParkingModule {}
