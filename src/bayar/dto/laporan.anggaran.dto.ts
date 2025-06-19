import { IsInt, IsString, IsOptional } from 'class-validator';

export class LaporanAnggaranDto {
    @IsOptional()
    @IsString()
    tanggal_awal: string;

    @IsOptional()
    @IsString()
    tanggal_akhir: string;

    @IsInt()
    id_jenis_anggaran: number;

    @IsInt()
    id_type_anggaran: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
