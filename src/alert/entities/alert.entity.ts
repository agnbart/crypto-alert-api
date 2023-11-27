import {Alert as AlertModel} from '@prisma/client';

export class AlertEntity implements AlertModel {
    id: string;
    email: string;
    crypto: string;
    price: number;
    currency: string;
    createdAt: Date;
}
