import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaUserService } from './prisma.user.service';

describe('UserService', () => {
    let service: UserService;
    let prisma: PrismaUserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaUserService],
        }).compile();

        service = module.get<UserService>(UserService);
        prisma = module.get<PrismaUserService>(PrismaUserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
