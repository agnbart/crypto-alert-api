import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CoinMarketCapService {
  // get-coin-market data
  async getCoinData() {
    try {
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getCoinDataBySymbols(symbols: string[]): Promise<Quotes[]> {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols.join(
        ',',
      )}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY,
        },
      },
    );

    const quotes: Quotes[] = Object.keys(response.data.data).map((key) => ({
         crypto: key,
         price: response.data.data[key].quote['USD'].price,
       }));
       return quotes;
  }
}

type Quotes = {
  crypto: string;
  price: number;
}
