import { IsString } from 'class-validator';

export class LoginUserDto {
    @IsString()
    userid: string;

    @IsString()
    pasword: string;
}
