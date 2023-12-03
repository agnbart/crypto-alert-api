import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { AlertService } from 'src/alert/alert.service';
import { AlertDto } from 'src/alert/dto/alert.dto';
import { CoinMarketCapService } from 'src/coin-market-cap/coin-market-cap.service';
import { MailjetService } from 'src/mailjet/mailjet.service';
import { AlertActionEnum } from 'src/mailjet/mailjet.service';


@Injectable()
export class MonitoringService {
  constructor(
    private readonly alertService: AlertService,
    private readonly coinMarketCapService: CoinMarketCapService,
    private readonly mailjetService: MailjetService,
  ) {}

  private readonly logger = new Logger(MonitoringService.name);
  private isInitiated: boolean = false;
  private alerts: AlertDto[] = [];
  private cryptos: any[] = [];

  @Timeout(5000)
  async initMonitoring() {
    this.logger.log('Alerts will be downloaded from the database');
    this.alerts = await this.alertService.findAll();
    this.logger.debug(`Initial alerts: ${JSON.stringify(this.alerts)}`);
    this.cryptos = [...new Set(this.alerts.map((alert) => alert.crypto))];
    this.logger.debug(`Initial cryptos: ${JSON.stringify(this.cryptos)}`);
    this.isInitiated = true;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async startMonitoring() {
    if (this.isInitiated) {
      const quotes = await this.coinMarketCapService.getCoinDataBySymbols(
        this.cryptos,
      );
      this.logger.debug(`I've got quotes: ${JSON.stringify(quotes)}`);
      const monitoringAlerts: MonitoringAlerts[] = this.alerts.map((alert) => ({
        crypto: alert.crypto,
        price: alert.price,
        email: alert.email,
      }));

      const filteredMonitoringAlerts = monitoringAlerts.filter((alert) => {
        const quote = quotes.find((q) => q.crypto === alert.crypto);
        return quote && quote.price > alert.price;
      });
      this.logger.log(`filteredMonitoringAlerts: ${JSON.stringify(filteredMonitoringAlerts)}`);
  
      filteredMonitoringAlerts.forEach((alert) => {
        const isSend = this.mailjetService.sendNewCryptoAlertEmail(
          alert.email,
          AlertActionEnum.FULFILLED,
        );
        if (isSend) {
          this.logger.log(`I've sent mail on ${alert.email}`);
        }
      });

    }
  }
}

type MonitoringAlerts = {
  crypto: string;
  price: number;
  email: string;
};
