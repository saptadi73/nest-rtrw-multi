import { IsInt, IsOptional, IsString } from 'class-validator';

export class BlokCreateDto {
    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    blok: string;
}
