import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    userid: string;

    @IsString()
    pasword: string;

    @IsInt()
    @IsOptional()
    id_level: number;

    @IsInt()
    @IsOptional()
    id: number;
}
