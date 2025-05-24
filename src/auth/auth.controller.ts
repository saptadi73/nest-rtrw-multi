import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { Tokens } from './types/token.types';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
        return this.authService.SignUp(createUserDto);
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() loginUserDto: LoginUserDto): Promise<Tokens> {
        return this.authService.SignIn(loginUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    @Post('/signout')
    signOutLocal(@Req() req: Request) {
        const user = req.user;

        return this.authService.SignOut(user['sub']);
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    signRefreshLocal(@Req() req: Request) {
        const user = req.user;

        return user;
    }
}
