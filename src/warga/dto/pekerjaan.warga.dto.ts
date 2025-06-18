import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PekerjaanWargaDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
