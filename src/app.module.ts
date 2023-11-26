import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { PrismaModule } from './prisma/prisma.module';
import { MyConfigModule } from './config/config.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [CoinMarketCapModule, PrismaModule, MyConfigModule, AlertModule],
  controllers: [AppController],
  providers: [AppService, CoinMarketCapService],
})
export class AppModule {}
