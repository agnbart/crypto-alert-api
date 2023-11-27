import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlertActionEnum, MailjetService } from 'src/mailjet/mailjet.service';
import { ObjectId } from 'mongodb';

interface IAlertResponse {
  alertId: string;
  errorMsg: string;
}

@Injectable()
export class AlertService {
  constructor(private readonly prismaService: PrismaService, private readonly mailjetService: MailjetService) {}

  async create(createAlertDto: CreateAlertDto): Promise<IAlertResponse> {
    createAlertDto.createdAt = new Date();
    let errorMsg = null;
    let createdAlertId = null;

    await this.prismaService.alert
      .create({
        data: createAlertDto,
      })
      .then((createdAlert: any) => {
        createdAlertId = createdAlert.id;
        this.mailjetService.sendNewCryptoAlertEmail(createAlertDto.email, AlertActionEnum.CREATED);
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

  async findAll() {
    return await this.prismaService.alert.findMany();
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
      }
    });
    return alerts;
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    return `This action updates a #${id} alert`;
  }

  async remove(id: string): Promise<IAlertResponse> {
    let errorMsg = null;
    let deletedAlertId = null;

    await this.prismaService.alert
    .delete({
      where: { id: id }
    })
    .then((deletedAlert: any) => {
      deletedAlertId = deletedAlert.id;
      this.mailjetService.sendNewCryptoAlertEmail(deletedAlert.email, AlertActionEnum.DELETED);
    })
    .catch((error) => {
      errorMsg = `Error on deleting Alert: ${error.message}`;
    });

    return { alertId: deletedAlertId, errorMsg: errorMsg };
  }
}
