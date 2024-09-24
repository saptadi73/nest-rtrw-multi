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

    @IsString()
    @IsOptional()
    type_anggaran: string;

    @IsInt()
    id: number;
}
