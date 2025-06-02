import { Module } from '@nestjs/common';
import { TrailController } from './trail.controller';
import { TrailService } from './trail.service';
import { PrismaTrailService } from './prisma.trail.service';

@Module({
    controllers: [TrailController],
    providers: [TrailService, PrismaTrailService],
})
export class TrailModule {}
