import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class AnggaranCreateDto {
    @IsString()
    @IsOptional()
    keterangan: string;

    @IsInt()
    id_warga: number;

    @IsInt()
    id_jenis_anggaran: number;

    @IsInt()
    nilai: number;

    @IsDateString()
    tanggal: string;

    @IsInt()
    id_type_anggaran: number;

    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
