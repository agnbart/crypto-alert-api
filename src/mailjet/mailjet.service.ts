import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LibraryResponse, SendEmailV3_1 } from 'node-mailjet';

export enum AlertActionEnum {
  CREATED = 'created',
  FULFILLED = 'fulfilled',
  DELETED = 'deleted',
}

@Injectable()
export class MailjetService {
  private readonly logger = new Logger(MailjetService.name);
  private readonly mailjet: Client;

  constructor(private configService: ConfigService) {
    this.mailjet = new Client({
      apiKey: this.configService.get<string>('MJ_APIKEY_PUBLIC'),
      apiSecret: this.configService.get<string>('MJ_APIKEY_PRIVATE'),
    });
  }

  async sendNewCryptoAlertEmail(
    userEmail: string,
    alertAction: string,
    isMockService: boolean = false,
  ): Promise<boolean> {
    let subjectAlert = '';
    let text = '';
    switch (alertAction) {
      case AlertActionEnum.CREATED:
        subjectAlert = 'Alert created';
        text = 'Your alert has been created';
        break;
      case AlertActionEnum.FULFILLED:
        subjectAlert = 'Alert fulfilled';
        text = 'Your alert has been fulfilled';
        break;
      case AlertActionEnum.DELETED:
        subjectAlert = 'Alert deleted';
        text = 'Your alert has been deleted';
        break;
    }
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MJ_MAIL_FROM,
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: subjectAlert,
          TextPart: text,
        },
      ],
    };

    try {
      if (isMockService) this.logger.warn('Mock is used to send emails!');
      else await this.mailjet.post('send', { version: 'v3.1' }).request(data);
      return true;
    } catch (error) {
      console.error(`Error in sendMail: ${error}`);
      return false;
    }
  }
}
