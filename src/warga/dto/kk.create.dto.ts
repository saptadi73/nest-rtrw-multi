import { Optional } from '@nestjs/common';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class KkCreateDto {
    @IsString()
    no_kk: string;

    @IsInt()
    id_blok: number;

    @IsString()
    no_rumah: string;

    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    no_hp: string;

    @IsString()
    @Optional()
    nik: string;

    @IsDateString()
    @IsOptional()
    tanggal_lahir: string;

    @IsString()
    @Optional()
    tempat_lahir: string;

    @IsString()
    @Optional()
    jenis_kelamin: string;

    @IsNumber()
    @IsOptional()
    id_type: number;

    @IsInt()
    @IsOptional()
    id_pekerjaan: number;

    @IsInt()
    @IsOptional()
    id_status_warga: number;
}
