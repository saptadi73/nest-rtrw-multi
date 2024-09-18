import { Test, TestingModule } from '@nestjs/testing';
import { Warga } from './warga';
import { PrismaWargaService } from './prisma.warga.service';

describe('Warga', () => {
    let provider: Warga;
    let prisma: PrismaWargaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Warga, PrismaWargaService],
        }).compile();

        provider = module.get<Warga>(Warga);
        prisma = module.get<PrismaWargaService>(PrismaWargaService);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
