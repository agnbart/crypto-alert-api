import { Controller, Get, Post, Param} from '@nestjs/common';
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

  @Post('/alert-new/:userEmail')
  async getSendNewAlert(@Param('userEmail') userEmail: string): Promise<boolean> {
    const alertDetails = 'Creation new crypto alert';
    return this.mailService.sendNewCryptoAlertEmail(userEmail, alertDetails);
  }

  @Post('/alert-price/:userEmail')
  async getSendPriceAlert(@Param('userEmail') userEmail: string): Promise<boolean> {
    const alertDetails = 'The expected price was obtained';
    return this.mailService.sendCryptoAlertPriceReachedEmail(userEmail, alertDetails);
  }

  @Post('/alert-delete/:userEmail')
  async getSendDeleteAlert(@Param('userEmail') userEmail: string): Promise<boolean> {
    const alertDetails = 'The alert has been removed';
    return this.mailService.sendCryptoAlertDeletionEmail(userEmail, alertDetails);
  }
}
