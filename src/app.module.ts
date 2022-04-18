import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingLotController } from './parking-lot/parking-lot.controller';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationModule } from './registration/registration.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        databaseConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ParkingLotModule,
    RegistrationModule],
  controllers: [AppController, ParkingLotController, RegistrationController],
  providers: [AppService],
})
export class AppModule {}
