import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { PrismaModule } from './prisma/prisma.module';
import { MyConfigModule } from './config/config.module';
import { AlertModule } from './alert/alert.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertService } from './alert/alert.service';
import { MailjetService } from './mailjet/mailjet.service';
import { MailjetModule } from './mailjet/mailjet.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { MonitoringService } from './monitoring/monitoring.service';

@Module({
  imports: [CoinMarketCapModule, PrismaModule, MyConfigModule, AlertModule, ScheduleModule.forRoot(), MailjetModule, MonitoringModule],
  controllers: [AppController],
  providers: [AppService, CoinMarketCapService, AlertService, MailjetService],
})

export class AppModule {}
