import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { Profile } from './profile';
import { PrismaProfileService } from './prisma.profle.service';

@Module({
    controllers: [ProfileController],
    providers: [Profile, PrismaProfileService],
})
export class ProfileModule {}
