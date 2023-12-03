import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @Res() res: Response,
  ): Promise<Response> {
    const IAlertResponse = await this.alertService.create(createAlertDto);
    if (IAlertResponse.alertId)
      return res
        .status(201)
        .send(`Alert has been created: ${IAlertResponse.alertId}`);
    else return res.status(400).send(`Error: ${IAlertResponse.errorMsg}`);
  }

  @Get()
  findAll() {
    return this.alertService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.alertService.findOne(email);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const IAlertResponse = await this.alertService.remove(id);
    if (IAlertResponse.alertId)
      return res
        .status(200)
        .send(`Alert ${IAlertResponse.alertId} has been removed`);
    else return res.status(400).send(`Error: ${IAlertResponse.errorMsg}`);
  }
}
