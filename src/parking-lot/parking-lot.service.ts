import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ParkingLotRepository } from './parking-lot.repository';

@Injectable()
export class ParkingLotService {
    constructor(
        @InjectRepository(ParkingLotRepository)
        private readonly parkingLotRepository: ParkingLotRepository
      ) {}

      async listAll(): Promise<any> {
        const query = this.parkingLotRepository.createQueryBuilder();
        const data = await query.getMany();
        console.log('===================');
        console.log(data);
        console.log('===================');
      }
}
