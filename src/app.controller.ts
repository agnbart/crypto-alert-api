import { Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { MailjetService } from './mailjet/mailjet.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailjetService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/alert-new')
  getSendNewAlert(): Promise<boolean> {
    const userEmail = 'ab@example.com';
    const alertDetails = 'Creation new crypto alert';
    return this.mailService.sendNewCryptoAlertEmail(userEmail, alertDetails);
  }

  @Post('/alert-price')
  getSendPriceAlert(): Promise<boolean> {
    const userEmail = 'ab@example.com';
    const alertDetails = 'Creation new crypto alert';
    return this.mailService.sendCryptoAlertPriceReachedEmail(userEmail, alertDetails);
  }

  @Post('/alert-delete')
  getSendDeleteAlert(): Promise<boolean> {
    const userEmail = 'ab@example.com';
    const alertDetails = 'Creation new crypto alert';
    return this.mailService.sendCryptoAlertDeletionEmail(userEmail, alertDetails);
  }
}
