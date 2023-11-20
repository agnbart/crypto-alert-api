import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LibraryResponse, SendEmailV3_1 } from 'node-mailjet';
import * as Mailjet from 'node-mailjet';

@Injectable()
export class MailjetService {
  private readonly mailjet: Client;
  constructor(private configService: ConfigService) {
    this.mailjet = new Client({
      apiKey: this.configService.get<string>('MJ_APIKEY_PUBLIC'),
      apiSecret: this.configService.get<string>('MJ_APIKEY_PRIVATE'),
    });
  }

  async sendNewCryptoAlertEmail(userEmail: string, alertDetails: string): Promise<boolean> {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: alertDetails,
          HTMLPart: '<h3>Dear Client</h3><br />A new alert has been created.',
          TextPart: 'Dear Client, a new alert has been created.',
        },
      ],
    };

    try {
      const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request(data);

      // return result.body.Messages[0]; // response status
      console.log(userEmail);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendCryptoAlertPriceReachedEmail(userEmail: string, alertDetails: string): Promise<boolean> {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: alertDetails,
          HTMLPart:
            '<h3>Dear Client</h3><br />The expected price was obtained.',
          TextPart: 'Dear Client, the expected price was obtained.',
        },
      ],
    };
    try {
      const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async sendCryptoAlertDeletionEmail(userEmail: string, alertDetails: string): Promise<boolean> {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
          },
          To: [
            {
              Email: userEmail,
            },
          ],
          Subject: alertDetails,
          HTMLPart: '<h3>Dear Client</h3><br />Your alert has been deleted.',
          TextPart: 'Dear Client, your alert has been deleted.',
        },
      ],
    };
    try {
      const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
        .post('send', { version: 'v3.1' })
        .request(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
