import { Module } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap.service';

@Module({
    exports: [CoinMarketCapService],
    providers: [CoinMarketCapService],
})
export class CoinMarketCapModule {}
