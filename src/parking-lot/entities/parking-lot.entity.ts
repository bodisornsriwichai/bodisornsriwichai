import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
// import {
//   CampaignTypeEnum,
//   CampaignCreditTypeEnum,
//   CampaignStatusEnum,
//   CampaignSeperateEnum,
// } from '../campaign.enum';

// --- Entity
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

  // @Column({ name: 'acc_id' })
  // accId: number;

  // @Column()
  // name: string;

  // @Column()
  // message: string;

  // @Column({
  //   type: 'enum',
  //   enum: CampaignTypeEnum,
  //   default: CampaignTypeEnum.NONE,
  // })
  // type: CampaignTypeEnum;

  // @Column()
  // balance: number;

  // @Column({ name: 'sender_name' })
  // senderName: string;

  // @Column({
  //   type: 'enum',
  //   enum: CampaignSeperateEnum,
  //   default: CampaignSeperateEnum.NONE,
  // })
  // separator: CampaignSeperateEnum;

  // @Column({default: null})
  // filename: string;

  // @Column({ name: 'phone_numbers', default: null })
  // phoneNumbers: string;

  // @Column({ name: 'total_phone_numbers' })
  // totalPhoneNumbers: number;

  // @Column({ name: 'delivered_phone_numbers' })
  // deliveredPhoneNumbers: number;

  // @Column({
  //   type: 'enum',
  //   enum: CampaignStatusEnum,
  //   default: CampaignStatusEnum.NONE,
  // })
  // status: CampaignStatusEnum;

  // @CreateDateColumn({ name: 'created_date', nullable: false })
  // createdDate: Date;

  // @Column({ name: 'delivery_date', type: 'datetime' })
  // deliveryDate: Date;

  // @UpdateDateColumn({ name: 'updated_date' })
  // updatedDate: Date;

  // @Column({ name: 'finished_date' })
  // finishedDate: Date;
}
