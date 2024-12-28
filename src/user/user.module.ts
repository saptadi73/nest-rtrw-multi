import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaUserService } from './prisma.user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaUserService],
})
export class UserModule {}
