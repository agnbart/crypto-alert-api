import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface IAlertResponse {
  alertId: string;
  errorMsg: string;
}

@Injectable()
export class AlertService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlertDto: CreateAlertDto): Promise<IAlertResponse> {
    let errorMsg = null;
    let createdAlertId = null;
    await this.prismaService.alert
      .create({
        data: createAlertDto,
      })
      .then((createdAlert: any) => {
        createdAlertId = createdAlert.id;
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

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    return `This action updates a #${id} alert`;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
