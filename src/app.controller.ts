import { Controller, Get } from '@nestjs/common';
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

  @Get('/alert-new')
  getSendNewAlert(): unknown {
    return this.mailService.sendNewCryptoAlertEmail();
  }

  @Get('/alert-price')
  getSendPriceAlert(): unknown {
    return this.mailService.sendCryptoAlertPriceReachedEmail();
  }

  @Get('/alert-delete')
  getSendDeleteAlert(): unknown {
    return this.mailService.sendCryptoAlertDeletionEmail();
  }
}
