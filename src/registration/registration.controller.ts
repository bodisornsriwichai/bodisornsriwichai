import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { RegistrationCheckinDto } from './dto/registration-checkin.dto';
import { RegistrationCheckoutDto } from './dto/registration-checkout.dto';
import { RegistrationPlatesDto } from './dto/registration-plates.dto';

@Controller('registration')
export class RegistrationController {
    constructor(
        private readonly registrationService: RegistrationService,
    ) {}
    @Get('plates')
    getPlates(@Query() query: RegistrationPlatesDto ) {
        const { carSize, parkingLotId } = query;
        return this.registrationService.getPlates(parkingLotId, carSize);
    }

    @Get('allocated')
    getAllocated(@Query() query: RegistrationPlatesDto ) {
        const { carSize, parkingLotId } = query;
        return this.registrationService.getAllocated(parkingLotId, carSize);
    }

    @Post('out')
    getCheckOut( @Body() body: RegistrationCheckoutDto ) {
        return this.registrationService.checkOut(body);
    }

    @Post()
    async getCheckIn( @Body() body: RegistrationCheckinDto ) {
        return await this.registrationService.checkIn(body);
    }

}
