import { Module } from '@nestjs/common';
import { MailjetService } from './mailjet.service';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  providers: [MailjetService],
  exports: [MailjetService],
})
export class MailjetModule {}
