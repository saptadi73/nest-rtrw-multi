import { Test, TestingModule } from '@nestjs/testing';
import { Profile } from './profile';
import { PrismaProfileService } from './prisma.profle.service';

describe('Profile', () => {
    let provider: Profile;
    let prisma: PrismaProfileService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Profile, PrismaProfileService],
        }).compile();

        provider = module.get<Profile>(Profile);
        prisma = module.get<PrismaProfileService>(PrismaProfileService);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
