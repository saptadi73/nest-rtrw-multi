import { IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
