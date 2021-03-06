import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'parking_lot' })
export class ParkingLotEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parking_lot_name' })
  parkingLotName: string;

  @Column({ name: 'parking_small' })
  parkingSmall: number;

  @Column({ name: 'parking_medium' })
  parkingMedium: number;

  @Column({ name: 'parking_large' })
  parkingLarge: number;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_date', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

}
