import { EntityRepository, Repository } from 'typeorm';

// --- Load Common
import { ParkingLotEntity } from './entities/parking-lot.entity';

@EntityRepository(ParkingLotEntity)
export class ParkingLotRepository extends Repository<ParkingLotEntity> {}
