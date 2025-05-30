import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async getTokens(userid: string, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userid,
                    email: email,
                },
                {
                    secret: '6f91c7a0-ebd5-42bc-babb-507d0afb5979',
                    expiresIn: 60 * 15,
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userid,
                    email: email,
                },
                {
                    secret: '40540746-d85a-45c6-88d3-85ca1a8a5c8c',
                    expiresIn: 60 * 60 * 24 * 7,
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
                data: user.data,
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
