import { PartialType } from '@nestjs/mapped-types';
import { AlertEntity } from '../entities/alert.entity';

export class AlertDto extends PartialType(AlertEntity) {}
