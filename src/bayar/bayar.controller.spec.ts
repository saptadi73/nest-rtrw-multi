import { Test, TestingModule } from '@nestjs/testing';
import { BayarController } from './bayar.controller';
import { Bayar } from './bayar';

describe('BayarController', () => {
    let controller: BayarController;
    const myServiceMock = {
        findAll: jest.fn().mockReturnValue([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BayarController],
            providers: [
                {
                    provide: Bayar,
                    useValue: myServiceMock,
                },
            ],
        }).compile();

        controller = module.get<BayarController>(BayarController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
