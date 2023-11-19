import { Injectable } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap/coin-market-cap.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
