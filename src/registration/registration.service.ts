import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingService } from '../parking/parking.service';

import { STATUS, CODE_201, CODE_400, SLOT, CAR_SIZE } from '../constant/common';
@Injectable()
export class RegistrationService {
    private readonly logger = new Logger(RegistrationService.name);
  constructor(
    private readonly parkingService: ParkingService,
  ) {}

    async checkIn(body): Promise<any> {
        const { plateNumber, carSize, parkingLotId } = body;
        return await this.parkingService.findSlot(parkingLotId, carSize, plateNumber);
    }
    async checkOut(body): Promise<any> {
        const { plateNumber, parkingLotId } = body;
        return await this.parkingService.checkSlot(parkingLotId, plateNumber);
    }
}
