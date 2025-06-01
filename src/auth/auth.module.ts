import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaUserService } from 'src/user/prisma.user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        // 1) Untuk Access Tokens
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cs: ConfigService) => ({
                secret: cs.get<string>('JWT_ACCESS_SECRET'),
                signOptions: { expiresIn: cs.get<string>('JWT_ACCESS_EXPIRES_IN') },
            }),
        }),

        // 2) Untuk Refresh Tokens
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // kita override provider token supaya tidak tabrakan
            global: false,
            useFactory: (cs: ConfigService) => ({
                secret: cs.get<string>('JWT_REFRESH_SECRET'),
                signOptions: { expiresIn: cs.get<string>('JWT_REFRESH_EXPIRES_IN') },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy, UserService, PrismaUserService],
})
export class AuthModule {}
