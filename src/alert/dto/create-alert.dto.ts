import { OmitType } from "@nestjs/mapped-types";
import { AlertEntity } from "../entities/alert.entity";

export class CreateAlertDto extends OmitType(AlertEntity, ['id']){}
