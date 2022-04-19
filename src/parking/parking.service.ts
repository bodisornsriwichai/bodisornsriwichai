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

  async listByParkingLot(id, carSize?,slot?): Promise<any> {
    let query = this.parkingRepository.createQueryBuilder();
    query = query.where(`parking_lot_id = :parkingLotId`, { parkingLotId:id });
    query = query.andWhere(`status = :STATUS`, { STATUS: STATUS.ACIIVE });
    query.orderBy('id');
    if(carSize){
      query = query.andWhere(`car_size = :carSize`, { carSize });
    }
    if(slot){
      query = query.andWhere(`slot = :slot`, { slot: slot });
    }

    const res = await query.getMany();
    return res;
  }

  async findSlot(parkingLotId, carSize, plateNumber): Promise<any> {
    let query = this.parkingRepository.createQueryBuilder();
    query = query.where(`parking_lot_id = :parkingLotId`, { parkingLotId });
    query = query.andWhere(`car_size = :carSize`, { carSize });
    query = query.andWhere(`slot = :slot`, { slot: SLOT.EMPTY });
    query = query.andWhere(`status = :STATUS`, { STATUS: STATUS.ACIIVE });
    query.orderBy('parking_id');
    query.limit(1);
    const res = await query.getMany();
    if(res.length){
      try {
        this.logger.log({
          message: `[findSlot] updated parking slot`,
          parkingLotId: parkingLotId,
          parkingId: res[0].parkingId,
        });
        await this.parkingRepository.createQueryBuilder().update().set({plateNumber:plateNumber, slot: SLOT.FULL,updatedDate: new Date()}).where(`parking_id = :id`,{id:res[0].parkingId}).andWhere(`parking_lot_id = :parkingLotId`, { parkingLotId }).andWhere(`car_size = :carSize`, { carSize }).execute();
      } catch (error) {
        this.logger.error({ message: `[findSlot] Failed parking cannot updated slot`,error });
        return CODE_400;
      }
    } else {
      return {
        statusCode: 400,
        message: 'parking is full',
      };
    }
    return CODE_200;
  }

  async checkSlot(parkingLotId, plateNumber): Promise<any> {
    let query = this.parkingRepository.createQueryBuilder();
    query = query.where(`parking_lot_id = :parkingLotId`, { parkingLotId });
    query = query.andWhere(`plate_number = :plateNumber`, { plateNumber });
    query = query.andWhere(`slot = :slot`, { slot: SLOT.FULL });
    query = query.andWhere(`status = :STATUS`, { STATUS: STATUS.ACIIVE });
    query.orderBy('parking_id');
    query.limit(1);
    const res = await query.getMany();
    if(res.length){
      try {
        this.logger.log({
          message: `[checkSlot] updated parking slot`,
          parkingLotId: parkingLotId,
          parkingId: res[0].parkingId,
        });
        await this.parkingRepository.createQueryBuilder().update().set({plateNumber:'', slot: SLOT.EMPTY,updatedDate: new Date()}).where(`parking_id = :id`,{id:res[0].parkingId}).andWhere(`parking_lot_id = :parkingLotId`, { parkingLotId }).andWhere(`plate_number = :plateNumber`, { plateNumber }).execute();
      } catch (error) {
        this.logger.error({ message: `[checkSlot] Failed parking cannot updated slot`,error });
        return CODE_400;
      }
    } else {
      return {
        statusCode: 204,
        message: 'No Content',
      };
    }
    return CODE_200;
  }

  async create(parkingLotId, parkingId, carSize) {
    let res;
    try {
      res = await this.parkingRepository.save({
        parkingLotId: parkingLotId,
        parkingId: parkingId,
        slot: SLOT.EMPTY,
        status: STATUS.ACIIVE,
        plateNumber: '',
        carSize: carSize,
        createdDate: new Date(),
        updatedDate: new Date(),
      });
      this.logger.log({
        message: `[create] parking can inserted DB`,
        parkingId: res.id,
      });
    } catch (error) {
      this.logger.error({ message: `[create] Failed parking cannot inserted DB`,error });
      return CODE_400;
    }
    return CODE_201;
  }

  async deleteAllByParkingLotId(parkingLotId) {
    try {
      await this.parkingRepository.createQueryBuilder().delete().where(`parking_lot_id = :id`,{id:parkingLotId}).execute();
      this.logger.log({
        message: `[deleteAllByParkingLotId] deleted parking by parkingLotId`,
        parkingLotId: parkingLotId,
      });
    } catch (error) {
      this.logger.error({ message: `[deleteAllByParkingLotId] Failed parking cannot deleted DB`,error });
      return CODE_400;
    }
    return CODE_200;
  }

  async updateStatus(parkingLotId, parkingId, carSize, status): Promise<any> {
    try {
      this.logger.log({
        message: `[checkSlot] updated parking slot`,
        parkingLotId: parkingLotId,
        parkingId: parkingId,
        status,
      });
      const res = await this.parkingRepository.createQueryBuilder().update().set({status:status,slot:SLOT.EMPTY,plateNumber:'', updatedDate: new Date()}).where(`parking_id = :id`,{id:parkingId}).andWhere(`parking_lot_id = :parkingLotId`, { parkingLotId }).andWhere(`car_size = :carSize`, { carSize }).execute();
      if(res.affected === 0) {
        this.logger.error({ message: `[checkSlot] Failed parking cannot updated slot` });
      return CODE_400;
      }
    } catch (error) {
      this.logger.error({ message: `[checkSlot] Failed parking cannot updated slot`,error });
      return CODE_400;
    }
    return CODE_200;
  }
}
