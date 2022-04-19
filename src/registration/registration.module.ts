import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { ParkingModule } from '../parking/parking.module';

@Module({
  imports:[
    ParkingModule
  ],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
