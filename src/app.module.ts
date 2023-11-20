import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MailjetModule } from './mailjet/mailjet.module';
import { MailjetService } from './mailjet/mailjet.service';

@Module({
  imports: [CoinMarketCapModule, PrismaModule, UsersModule, MailjetModule],
  controllers: [AppController],
  providers: [AppService, CoinMarketCapService, MailjetService],
})
export class AppModule {}
