import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ParkingLotRepository } from './parking-lot.repository';
import { STATUS, CODE_201, CODE_400, SLOT, CAR_SIZE } from '../constant/common';

import { ParkingService } from '../parking/parking.service';

@Injectable()
export class ParkingLotService {
  private readonly logger = new Logger(ParkingLotService.name);
  constructor(
    @InjectRepository(ParkingLotRepository)
    private readonly parkingLotRepository: ParkingLotRepository,

    private readonly parkingService: ParkingService,
  ) {}

  async listAll(): Promise<any> {
    const query = this.parkingLotRepository.createQueryBuilder();
    const data = await query.getMany();
    console.log('===================');
    console.log(data);
    this.logger.log('Doing something...');
    console.log('===================');
    return data;
  }

  async create(body) {
    let res;
    try {
      res = await this.parkingLotRepository.save({
        parkingLotName: body.name,
        parkingSmall: body.parkingSmall,
        parkingMedium: body.parkingMedium,
        parkingLarge: body.parkingLarge,
        status: STATUS.ACIIVE,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
      this.logger.log({
        message: `parking-Lot can inserted DB`,
        parkingLotId: res.id,
      });
    } catch (error) {
      this.logger.error({ message: `Failed parking-lot cannot inserted DB`,error });
      return CODE_400;
    }


    return CODE_201;
  }
}
