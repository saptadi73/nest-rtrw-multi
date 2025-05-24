import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaUserService } from 'src/user/prisma.user.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy, UserService, PrismaUserService],
})
export class AuthModule {}
