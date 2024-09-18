import { Test, TestingModule } from '@nestjs/testing';
import { WargaController } from './warga.controller';
import { Warga } from './warga';

describe('WargaController', () => {
    let controller: WargaController;
    const myServiceMock = {
        findAll: jest.fn().mockReturnValue([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WargaController],
            providers: [
                {
                    provide: Warga,
                    useValue: myServiceMock,
                },
            ],
        }).compile();

        controller = module.get<WargaController>(WargaController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
