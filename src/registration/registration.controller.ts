import { Controller, Get, Post, Body } from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { RegistrationCheckinDto } from './registration-checkin.dto';
import { RegistrationCheckoutDto } from './registration-checkout.dto';

@Controller('registration')
export class RegistrationController {
    constructor(
        private readonly registrationService: RegistrationService,
    ) {}

    @Post('out')
    getCheckOut( @Body() body: RegistrationCheckoutDto ) {
        return this.registrationService.checkOut(body);
    }

    @Post()
    getCheckIn( @Body() body: RegistrationCheckinDto ) {
        return this.registrationService.checkIn(body);
    }

}
