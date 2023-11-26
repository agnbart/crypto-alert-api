import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailjetModule } from 'src/mailjet/mailjet.module';
import { MailjetService } from 'src/mailjet/mailjet.service';

@Module({
  imports: [PrismaModule, MailjetModule],
  controllers: [AlertController],
  providers: [AlertService]
})
export class AlertModule {}
