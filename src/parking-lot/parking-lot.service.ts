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

    if(res){
        return await this.createParking(res.id,res.parkingSmall,res.parkingMedium,res.parkingLarge);
    }

    return CODE_201;
  }

  async createParking(parkingLotId,parkingSmall,parkingMedium,parkingLarge) {
    let parkingId = 1;
    if(parkingSmall > 0){
      parkingId = 1;
      for(;parkingId <= parkingSmall; parkingId++ ){
        const resParking =  await this.parkingService.create(parkingLotId,parkingId,CAR_SIZE.SMALL);
        if(resParking.statusCode === 400){
          await this.clearParkingLot(parkingLotId);
          return CODE_400;
        }
      }
    }
    if(parkingMedium > 0){
      parkingId = 1;
      for(;parkingId <= parkingMedium; parkingId++ ){
        const resParking =  await this.parkingService.create(parkingLotId,parkingId,CAR_SIZE.MEDIUM);
        if(resParking.statusCode === 400){
          await this.clearParkingLot(parkingLotId);
          return CODE_400;
        }
      }
    }
    if(parkingLarge > 0){
      parkingId = 1;
      for(;parkingId <= parkingLarge; parkingId++ ){
        const resParking =  await this.parkingService.create(parkingLotId,parkingId,CAR_SIZE.LARGE);
        if(resParking.statusCode === 400){
          await this.clearParkingLot(parkingLotId);
          return CODE_400;
        }
      }
    }
    return CODE_201;
  }

  async clearParkingLot(parkingLotId) {
    try {
      await this.parkingLotRepository.createQueryBuilder().delete().where(`id = :id`,{id:parkingLotId}).execute();
      await this.parkingService.deleteAllByParkingLotId(parkingLotId);
      this.logger.log({
        message: `deleted parking-lot by parkingLotId`,
        parkingLotId: parkingLotId,
      });
    } catch (error) {
      this.logger.error({ message: `Failed parking-lot cannot deleted DB`,error });
      return CODE_400;
    }
  }
}
