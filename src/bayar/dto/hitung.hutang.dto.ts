import { IsInt, IsOptional, IsString } from 'class-validator';

export class HitungHutangDto {
    @IsInt()
    @IsOptional()
    bulan: number;

    @IsInt()
    @IsOptional()
    tahun: number;

    @IsInt()
    @IsOptional()
    id_kk: number;

    @IsInt()
    @IsOptional()
    nilai: number;

    @IsInt()
    @IsOptional()
    iuran: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
