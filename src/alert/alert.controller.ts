import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.update(+id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertService.remove(+id);
  }
}
