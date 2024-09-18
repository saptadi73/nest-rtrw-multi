import { IsInt, IsOptional } from 'class-validator';

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
    id_type: number;
}
