import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { AlertModule } from 'src/alert/alert.module';
import { CoinMarketCapModule } from 'src/coin-market-cap/coin-market-cap.module';
import { MailjetModule } from 'src/mailjet/mailjet.module';

@Module({
  imports: [AlertModule, CoinMarketCapModule, MailjetModule],
  providers: [MonitoringService]
})
export class MonitoringModule {}
