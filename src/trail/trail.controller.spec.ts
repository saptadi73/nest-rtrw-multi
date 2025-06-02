import { Test, TestingModule } from '@nestjs/testing';
import { TrailController } from './trail.controller';
import { TrailService } from './trail.service';

describe('TrailController', () => {
    let controller: TrailController;
    const myServiceMock = {
        findAll: jest.fn().mockReturnValue([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TrailController],
            providers: [
                {
                    provide: TrailService,
                    useValue: myServiceMock,
                },
            ],
        }).compile();

        controller = module.get<TrailController>(TrailController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
