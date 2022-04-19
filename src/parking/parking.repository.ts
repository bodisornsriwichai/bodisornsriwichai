import { EntityRepository, Repository } from 'typeorm';

// --- Load Common
import { ParkingEntity } from './entities/parking.entity';

@EntityRepository(ParkingEntity)
export class ParkingRepository extends Repository<ParkingEntity> {}
