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
    const isDuplicate = await this.alertService.findDuplicate(createAlertDto);
    if (isDuplicate) {
      return res.status(400).send('Alert already exist.');
    } else {
      const id = await this.alertService.create(createAlertDto);
      return res.status(201).send(`Alert was created with ID ${id}`);
    }
  }

  @Get()
  findAll() {
    return this.alertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertService.findOne(+id);
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
