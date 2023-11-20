import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailjetModule } from './mailjet/mailjet.module';
import { MailjetService } from './mailjet/mailjet.service';
import { MyConfigModule } from './config/config.module';

@Module({
  imports: [CoinMarketCapModule, PrismaModule, MailjetModule, MyConfigModule],
  controllers: [AppController],
  providers: [AppService, CoinMarketCapService, MailjetService],
})
export class AppModule {}
