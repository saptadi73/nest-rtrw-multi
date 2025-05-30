import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    id_level: string;

    @IsInt()
    @IsOptional()
    id: number;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
