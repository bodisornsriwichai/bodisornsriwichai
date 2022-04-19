import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'parking' })
export class ParkingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parking_lot_id' })
  parkingLotId: number;

  @Column({ name: 'parking_id' })
  parkingId: number;

  @Column()
  slot: string;

  @Column()
  status: string;

  @Column({ name: 'plate_number' })
  plateNumber: string;

  @Column({ name: 'car_size' })
  carSize: string;

  @CreateDateColumn({ name: 'created_date', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;
}
