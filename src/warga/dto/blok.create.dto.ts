import { IsOptional, IsString, IsNumber } from 'class-validator';

export class BlokCreateDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    blok: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
