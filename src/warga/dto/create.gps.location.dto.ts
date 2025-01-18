import { IsNumber, IsOptional } from 'class-validator';

export class CreateGpsLocationDto {
    @IsNumber()
    @IsOptional()
    latitude: number;

    @IsNumber()
    @IsOptional()
    longitude: number;

    @IsNumber()
    @IsOptional()
    id_kk: number;

    @IsNumber()
    @IsOptional()
    id: number;
}
