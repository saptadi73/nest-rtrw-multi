import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProfileService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleDestroy() {
        throw new Error('Method not implemented.');
    }
    async onModuleInit() {
        await this.$connect();
    }
}
