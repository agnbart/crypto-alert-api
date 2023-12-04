import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { AlertService } from 'src/alert/alert.service';
import { AlertDto } from 'src/alert/dto/alert.dto';
import { CoinMarketCapService } from 'src/coin-market-cap/coin-market-cap.service';
import { AlertActionEnum, MailjetService } from 'src/mailjet/mailjet.service';

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);
  private isInitiated: boolean = false;
  private monitoringAlerts: AlertDto[] = [];
  private cryptos: string[] = [];

  constructor(
    private readonly alertService: AlertService,
    private readonly coinMarketCapService: CoinMarketCapService,
    private readonly mailjetService: MailjetService,
  ) {
    this.initialize();
  }

  private async initialize() {
    try {
      this.logger.log('Alerts will be downloaded from the database');
      this.alertService.setAlerts(await this.alertService.findAll());
      this.updateMonitoring();
      
      this.logger.debug(
        `Initial alerts (number: ${this.monitoringAlerts.length}): ${JSON.stringify(this.monitoringAlerts)}`,
      );

      this.logger.debug(
        `Initial cryptos (number: ${this.cryptos.length}): ${JSON.stringify(this.cryptos)}`,
      );

      this.isInitiated = true;
    } catch (error) {
      this.logger.error('Initialization error:', error);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async startMonitoring() {
    this.updateMonitoring();
    if (this.isInitiated && this.cryptos.length > 0) {
      this.logger.log('Initilizing alert monitoring');
      const quotes = await this.coinMarketCapService.getCoinDataBySymbols(
        this.cryptos,
      );
      this.logger.debug(`I've got quotes: ${JSON.stringify(quotes)}`);
      const monitoringAlerts: MonitoringAlerts[] = this.monitoringAlerts.map(
        (alert) => ({
          crypto: alert.crypto,
          price: alert.price,
          email: alert.email,
        }),
      );

      const filteredMonitoringAlerts = monitoringAlerts.filter((alert) => {
        const quote = quotes.find((q) => q.crypto === alert.crypto);
        return quote && quote.price > alert.price;
      });
      this.logger.log(
        `filteredMonitoringAlerts: ${JSON.stringify(filteredMonitoringAlerts)}`,
      );

      filteredMonitoringAlerts.forEach((alert) => {
        const isSend = this.mailjetService.sendNewCryptoAlertEmail(
          alert.email,
          AlertActionEnum.FULFILLED,
          !!process.env.MJ_MOCK,
        );
        if (isSend) {
          this.logger.log(
            `Sending mail about meeting the alert conditions: ${alert.email}`,
          );
        }
      });
    } else {
      this.logger.log('Waiting for alerts to monitor ...');
    }
  }

  updateMonitoring() {
    this.monitoringAlerts = this.alertService.getAlerts();
    this.cryptos = [
      ...new Set(this.monitoringAlerts.map((alert) => alert.crypto)),
    ];
  }
}

type MonitoringAlerts = {
  crypto: string;
  price: number;
  email: string;
};
