import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { Profile } from './profile';

describe('ProfileController', () => {
    let controller: ProfileController;
    const myServiceMock = {
        findAll: jest.fn().mockReturnValue([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfileController],
            providers: [
                {
                    provide: Profile,
                    useValue: myServiceMock,
                },
            ],
        }).compile();

        controller = module.get<ProfileController>(ProfileController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
