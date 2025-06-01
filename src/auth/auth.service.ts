import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

    async getTokens(userid: string, email: string) {
        const accessSecret = this.config.get<string>('JWT_ACCESS_SECRET');
        const accessExpires = this.config.get<string>('JWT_ACCESS_EXPIRES_IN');

        const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
        const refreshExpires = this.config.get<string>('JWT_REFRESH_EXPIRES_IN');
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userid,
                    email: email,
                },
                {
                    secret: accessSecret,
                    expiresIn: accessExpires,
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userid,
                    email: email,
                },
                {
                    secret: refreshSecret,
                    expiresIn: refreshExpires,
                }
            ),
        ]);

        return { access_token: at, refresh_token: rt };
    }

    async SignUp(createUser: CreateUserDto) {
        const user = await this.userService.createNewUser(createUser);

        if (user.status == 'nok') {
            return {
                status: 'nok',
                message: user.message,
                access_token: '',
                refresh_token: '',
                data: user.data,
            };
        } else {
            const tokens = await this.getTokens(user.uuid, user.email);
            this.userService.updateRefreshToken(user.uuid, tokens.refresh_token);

            return {
                status: 'ok',
                message: user.message,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                data: user.data,
            };
        }
    }

    async SignIn(loginUserDto: LoginUserDto) {
        const user = await this.userService.loginUser(loginUserDto);

        if (user.status == 'nok') {
            return {
                status: 'nok',
                message: user.message,
                access_token: '',
                refresh_token: '',
                data: user.data3,
            };
        } else {
            const tokens = await this.getTokens(user.data3.uuid, user.data3.email);
            this.userService.updateRefreshToken(user.data3.uuid, tokens.refresh_token);

            return {
                status: 'ok',
                message: user.message,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                data: user.data3,
            };
        }
    }

    async SignOut(uuid: string) {
        const logOut = await this.userService.logoutUser(uuid);
        return {
            status: logOut.status,
            user: logOut.message,
            access_token: '',
            refresh_token: '',
            data: logOut.data,
        };
    }

    async refreshToken(uuid: string, refreshToken: string) {
        const user = await this.userService.refreshTokenAsli(uuid, refreshToken);
        if (user.status == 'nok') {
            return {
                status: 'nok',
                user: user.message,
                access_token: '',
                refresh_token: '',
                data: user.data,
            };
        } else {
            const tokens = await this.getTokens(user.data.uuid, user.data.email);
            this.userService.updateRefreshToken(user.data.uuid, tokens.refresh_token);

            return {
                status: 'ok',
                user: user.message,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                data: user.data,
            };
        }
    }
}
