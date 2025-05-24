import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsInt()
    @IsOptional()
    id_level: number;

    @IsInt()
    @IsOptional()
    id: number;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
