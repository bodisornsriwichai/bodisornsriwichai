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
        const parking = await this.parkingService.findSlot(parkingLotId, carSize, plateNumber);
        if(parking?.statusCode === 400) {
          return parking;
        }
        const res = {
          parkingId : parking[0].parkingId,
          carSize : parking[0].carSize
        };
        
        return res;
    }
    async checkOut(body): Promise<any> {
        const { plateNumber, parkingLotId } = body;
        return await this.parkingService.checkSlot(parkingLotId, plateNumber);
    }

    async getPlates(parkingLotId, carSize): Promise<any> {
      parkingLotId = Number(parkingLotId);
      if(!Number.isInteger(parkingLotId)){
        return CODE_400;
      }
      const parkingList = await this.parkingService.listByParkingLot(parkingLotId, carSize, SLOT.FULL);
      let res = {
        plateNumbers:[],
        total:0
      }
      for (const parkingData of parkingList) {
        res.plateNumbers.push({plateNumber:parkingData.plateNumber, slotNumber: parkingData.parkingId});
        res.total += 1;
      }

      return res;
    }

    async getAllocated(parkingLotId, carSize): Promise<any> {
      parkingLotId = Number(parkingLotId);
      if(!Number.isInteger(parkingLotId)){
        return CODE_400;
      }
      const parkingList = await this.parkingService.listByParkingLot(parkingLotId, carSize, SLOT.EMPTY);
      let res = {
        slotNumber:[],
        total:0
      }
      for (const parkingData of parkingList) {
        res.slotNumber.push(parkingData.parkingId);
        res.total += 1;
      }

      return res;
    }
}
