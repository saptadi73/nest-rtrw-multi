import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class AnggaranUpdateDto {
    @IsString()
    @IsOptional()
    keterangan: string;

    @IsInt()
    @IsOptional()
    id_warga: number;

    @IsInt()
    @IsOptional()
    id_jenis_anggaran: number;

    @IsInt()
    @IsOptional()
    nilai: number;

    @IsDateString()
    @IsOptional()
    tanggal: string;

    @IsInt()
    @IsOptional()
    id_type_anggaran: number;

    @IsInt()
    id: number;
}
