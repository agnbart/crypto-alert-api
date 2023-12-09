import { Injectable, Logger } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlertActionEnum, MailjetService } from 'src/mailjet/mailjet.service';
import { AlertDto } from './dto/alert.dto';

interface IAlertResponse {
  alertId: string;
  errorMsg: string;
}

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);
  private cachedAlerts: AlertDto[] = [];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailjetService: MailjetService,
  ) {}

  setCachedAlerts(value: AlertDto[]) {
    this.cachedAlerts = value;
  }

  getCachedAlerts(): AlertDto[] {
    return this.cachedAlerts;
  }

  async create(createAlertDto: CreateAlertDto): Promise<IAlertResponse> {
    createAlertDto.createdAt = new Date();
    let errorMsg = null;
    let createdAlertId = null;

    await this.prismaService.alert
      .create({
        data: createAlertDto,
      })
      .then((createdAlert: AlertDto) => {
        createdAlertId = createdAlert.id;
        this.cachedAlerts.push(createdAlert);

        this.mailjetService.sendNewCryptoAlertEmail(
          createAlertDto.email,
          AlertActionEnum.CREATED,
          !!process.env.MJ_MOCK,
        );
      })
      .catch((error) => {
        if ((error.code = 'P2002')) {
          if (
            error.message.indexOf(
              'Unique constraint failed on the constraint',
            ) > 0
          ) {
            errorMsg = 'Alert with these attributes already exist.';
          } else {
            errorMsg = 'Error on creating Alert.';
          }
        }
      });
    return { alertId: createdAlertId, errorMsg: errorMsg };
  }

  async findAll(): Promise<AlertDto[]> {
    const alerts = await this.prismaService.alert.findMany();
    return alerts;
  }

  async findOne(email: string) {
    const alerts = await this.prismaService.alert.findMany({
      where: {
        email: email,
      },
      select: {
        id: true,
        crypto: true,
        currency: true,
        price: true,
        createdAt: true,
      },
    });
    return alerts;
  }

  async remove(id: string): Promise<IAlertResponse> {
    let errorMsg = null;
    let deletedAlertId = null;

    await this.prismaService.alert
      .delete({
        where: { id: id },
      })
      .then((deletedAlert: any) => {
        deletedAlertId = deletedAlert.id;
        this.cachedAlerts = this.cachedAlerts.filter(
          (alert) => alert.id !== deletedAlertId,
        );
        this.logger.log(
          `Sending mail about deleting the alert: ${deletedAlertId}`,
        );

        this.mailjetService.sendNewCryptoAlertEmail(
          deletedAlert.email,
          AlertActionEnum.DELETED,
          !!process.env.MJ_MOCK,
        );
      })
      .catch((error) => {
        errorMsg = `Error on deleting Alert: ${error.message}`;
      });

    return { alertId: deletedAlertId, errorMsg: errorMsg };
  }
}
