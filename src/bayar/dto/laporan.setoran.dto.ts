import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class LaporanSetoranDto {
    @IsDateString()
    tanggal_awal: string;

    @IsDateString()
    tanggal_akhir: string;

    @IsInt()
    iuran: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
