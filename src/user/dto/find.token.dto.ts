import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindTokenDto {
    @IsString()
    @IsOptional()
    token: string;

    @IsNumber()
    @IsOptional()
    id_user: number;

    @IsNumber()
    @IsOptional()
    id: number;
}
