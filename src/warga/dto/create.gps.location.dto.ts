import { IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsString()
    @IsOptional()
    id_tenant: string;
}
