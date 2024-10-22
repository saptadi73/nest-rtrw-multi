import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class WargaUpdateDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    nik: string;

    @IsInt()
    @IsOptional()
    id_type: number;

    @IsString()
    @IsOptional()
    nama_type: string;

    @IsInt()
    @IsOptional()
    id_kk: number;

    @IsString()
    @IsOptional()
    no_hp: string;

    @IsString()
    @IsOptional()
    tempat_lahir: string;

    @IsDateString()
    @IsOptional()
    tanggal_lahir: string;

    @IsString()
    @IsOptional()
    jenis_kelamin: string;

    @IsInt()
    @IsOptional()
    id: number;
}
