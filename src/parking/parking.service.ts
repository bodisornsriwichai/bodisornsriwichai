import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ParkingRepository } from './parking.repository';
import { STATUS, CODE_200, CODE_201, CODE_400, SLOT } from '../constant/common';

@Injectable()
export class ParkingService {
  private readonly logger = new Logger(ParkingService.name);
  constructor(
    @InjectRepository(ParkingRepository)
    private readonly parkingRepository: ParkingRepository
  ) {}

  async listAll(): Promise<any> {
    const query = this.parkingRepository.createQueryBuilder();
    const data = await query.getMany();
    console.log('===================');
    console.log(data);
    this.logger.log('Doing something...');
    console.log('===================');
    return data;
  }

  async create(parkingLotId, parkingId, carSize) {
    let res;
    try {
      res = await this.parkingRepository.save({
        parkingLotId: parkingLotId,
        parkingId: parkingId,
        slot: 'empty',
        status: STATUS.ACIIVE,
        plateNumber: '',
        carSize: carSize,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
      this.logger.log({
        message: `parking can inserted DB`,
        parkingId: res.id,
      });
    } catch (error) {
      this.logger.error({ message: `Failed parking cannot inserted DB`,error });
      return CODE_400;
    }
    return CODE_201;
  }

  async deleteAllByParkingLotId(parkingLotId) {
    let res;
    try {
      await this.parkingRepository.createQueryBuilder().delete().where(`parking_lot_id = :id`,{id:parkingLotId}).execute();
      this.logger.log({
        message: `deleted parking by parkingLotId`,
        parkingLotId: parkingLotId,
      });
    } catch (error) {
      this.logger.error({ message: `Failed parking cannot deleted DB`,error });
      return CODE_400;
    }
    return CODE_200;

  }
}
