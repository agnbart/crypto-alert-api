import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private readonly prismaService: PrismaService) {}

  // async create(createAlertDto: CreateAlertDto): Promise<string> {
  //   const createdAlert = await this.prismaService.alert.create({
  //     data: createAlertDto,
  //   });
  //   return createdAlert.id;
  // }

  async create(createAlertDto: CreateAlertDto): Promise<string> {
    const createdAlert = await this.prismaService.alert
      .create({
        data: createAlertDto,
      })
      .then((createdAlert: any) => {
        console.log('Alert has been created with ID: ', createdAlert.id);
        return createdAlert.id;
      })
      .catch((error) => {
        console.log('Error at create Alert: ', error);
        return null;
      });
    return createdAlert;
  }

  // async findDuplicate(createAlertDto: CreateAlertDto): Promise<boolean> {
  //   const duplicate = await this.prismaService.alert.findFirst({
  //     where: {
  //       email: createAlertDto.email,
  //       crypto: createAlertDto.crypto,
  //       price: createAlertDto.price,
  //       currency: createAlertDto.currency,
  //     },
  //   });

  //   return duplicate ? true : false;
  // }

  findAll() {
    return `This action returns all alert`;
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
