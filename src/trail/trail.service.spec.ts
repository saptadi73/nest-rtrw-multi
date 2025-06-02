import { Test, TestingModule } from '@nestjs/testing';
import { TrailService } from './trail.service';
import { PrismaTrailService } from './prisma.trail.service';

describe('TrailService', () => {
    let service: TrailService;
    let prisma: PrismaTrailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TrailService, PrismaTrailService],
        }).compile();

        service = module.get<TrailService>(TrailService);
        prisma = module.get<PrismaTrailService>(PrismaTrailService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
