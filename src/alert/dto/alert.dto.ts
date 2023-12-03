import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alert.dto';

export class AlertDto extends PartialType(CreateAlertDto) {}
