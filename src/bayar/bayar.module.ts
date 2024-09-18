import { Module } from '@nestjs/common';
import { BayarController } from './bayar.controller';
import { Bayar } from './bayar';
import { PrismaBayarService } from './prisma.bayar.service';

@Module({
    controllers: [BayarController],
    providers: [Bayar, PrismaBayarService],
})
export class BayarModule {}
