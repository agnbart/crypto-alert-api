import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailjetModule } from 'src/mailjet/mailjet.module';
import { CoinMarketCapModule } from 'src/coin-market-cap/coin-market-cap.module';

@Module({
  imports: [PrismaModule, MailjetModule, CoinMarketCapModule],
  controllers: [AlertController],
  providers: [AlertService]
})
export class AlertModule {}
