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

  async getParkingLot(id): Promise<any> {
    id = Number(id);
    if(!Number.isInteger(id)){
      return CODE_400;
    }
    let res = {
      id:0,
      name:'',
      parkingSmall:{
        size:0,
        empty:0,
        use:0,
      },
      parkingMedium:{
        size:0,
        empty:0,
        use:0,
      },
      parkingLarge:{
        size:0,
        empty:0,
        use:0,
      },
    };

    let query = this.parkingLotRepository.createQueryBuilder();
    query = query.where(`id = :parkingLotId`, { parkingLotId:id });
    query = query.andWhere(`status = :STATUS`, { STATUS: STATUS.ACIIVE });
    query.limit(1);
    const parkingLotRes = await query.getMany();
    if(parkingLotRes.length){
      res.id = parkingLotRes[0].id;
      res.name = parkingLotRes[0].parkingLotName;
      const resParking = await this.parkingService.listByParkingLot(id);
      if(resParking.length){
        for (const parkingData of resParking) {
          switch(parkingData.carSize) {
            case CAR_SIZE.SMALL:
              (parkingData.slot === SLOT.EMPTY) ? res.parkingSmall.empty += 1 : res.parkingSmall.use += 1
              res.parkingSmall.size += 1;
              break;
            case CAR_SIZE.MEDIUM:
              (parkingData.slot === SLOT.EMPTY) ? res.parkingMedium.empty += 1 : res.parkingMedium.use += 1
              res.parkingMedium.size += 1;
              break;
            case CAR_SIZE.LARGE:
              (parkingData.slot === SLOT.EMPTY) ? res.parkingLarge.empty += 1 : res.parkingLarge.use += 1
              res.parkingLarge.size += 1;
              break;
            default:
              break;
          }
        }
      }else{
        return {
          statusCode: 204,
          message: 'No Content',
        };
      }
    }else{
      return {
        statusCode: 204,
        message: 'No Content',
      };
    }
    return res;
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
