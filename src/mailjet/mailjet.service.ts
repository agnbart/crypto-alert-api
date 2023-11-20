import { Injectable } from '@nestjs/common';
import { Client, LibraryResponse, SendEmailV3_1 } from 'node-mailjet';
import * as Mailjet from 'node-mailjet';

@Injectable()
export class MailjetService {
  readonly mailjet = new Client({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE,
  });

  async sendNewCryptoAlertEmail(): Promise<unknown> {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
          },
          To: [
            {
              Email: process.env.MAIL_TO,
            },
          ],
          Subject: 'Creation new crypto alert',
          HTMLPart:
            '<h3>Dear Client</h3><br />A new alert has been created.',
          TextPart:
            'Dear Client, a new alert has been created.',
        },
      ],
    };

    const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
      .post('send', { version: 'v3.1' })
      .request(data);

    return result.body.Messages[0]; // response status
  }

  async sendCryptoAlertPriceReachedEmail(): Promise<unknown> {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
          },
          To: [
            {
              Email: process.env.MAIL_TO,
            },
          ],
          Subject: 'Price reached alert',
          HTMLPart:
            '<h3>Dear Client</h3><br />The expected price was obtained.',
          TextPart:
            'Dear Client, the expected price was obtained.',
        },
      ],
    };

    const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
      .post('send', { version: 'v3.1' })
      .request(data);

    return result.body.Messages[0]; // response status
  }

  async sendCryptoAlertDeletionEmail(): Promise<unknown> {
    const data: SendEmailV3_1.Body = {
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM,
          },
          To: [
            {
              Email: process.env.MAIL_TO,
            },
          ],
          Subject: 'Deletion mail alert',
          HTMLPart:
            '<h3>Dear Client</h3><br />Your alert has been deleted.',
          TextPart:
            'Dear Client, your alert has been deleted.',
        },
      ],
    };

    const result: LibraryResponse<SendEmailV3_1.Response> = await this.mailjet
      .post('send', { version: 'v3.1' })
      .request(data);

    return result.body.Messages[0]; // response status
  }

}
