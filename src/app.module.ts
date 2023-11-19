import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';

@Module({
  imports: [CoinMarketCapModule],
  controllers: [AppController],
  providers: [AppService, CoinMarketCapService],
})
export class AppModule {}
