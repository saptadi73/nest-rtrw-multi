import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { Tokens } from './types/token.types';
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

    async SignUp(createUser: CreateUserDto): Promise<Tokens> {
        const user = await this.userService.createNewUser(createUser);

        if (user.status == 'nok') throw new ForbiddenException(user.message);
        const tokens = await this.getTokens(user.uuid, user.email);
        this.userService.updateRefreshToken(user.uuid, tokens.refresh_token);

        return tokens;
    }

    async SignIn(loginUserDto: LoginUserDto): Promise<Tokens> {
        const user = await this.userService.loginUser(loginUserDto);

        if (user.status == 'nok') throw new ForbiddenException(user.message);
        const tokens = await this.getTokens(user.data3.uuid, user.data3.email);
        this.userService.updateRefreshToken(user.data3.uuid, tokens.refresh_token);

        return tokens;
    }

    async SignOut(uuid: string) {
        const logOut = await this.userService.logoutUser(uuid);
        return logOut;
    }

    async refreshToken(uuid: string, refreshToken: string): Promise<Tokens> {
        const user = await this.userService.refreshTokenAsli(uuid, refreshToken);
        if (user.status == 'nok') throw new ForbiddenException(user.message);
        const tokens = await this.getTokens(user.data.uuid, user.data.email);
        this.userService.updateRefreshToken(user.data.uuid, tokens.refresh_token);

        return tokens;
    }
}
