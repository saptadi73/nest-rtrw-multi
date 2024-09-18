import { Test, TestingModule } from '@nestjs/testing';
import { Bayar } from './bayar';
import { PrismaBayarService } from './prisma.bayar.service';

describe('Bayar', () => {
    let provider: Bayar;
    let prisma: PrismaBayarService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Bayar, PrismaBayarService],
        }).compile();

        provider = module.get<Bayar>(Bayar);
        prisma = module.get<PrismaBayarService>(PrismaBayarService);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
