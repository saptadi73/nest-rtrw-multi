import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    userid: string;

    @IsString()
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
