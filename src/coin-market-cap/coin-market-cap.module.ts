import { Module } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap.service';

@Module({
    providers: [CoinMarketCapService],
})
export class CoinMarketCapModule {}
