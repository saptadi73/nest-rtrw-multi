import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class KkCreateDto {
    @IsString()
    no_kk: string;

    @IsInt()
    id_blok: number;

    @IsString()
    no_rumah: string;

    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    no_hp: string;

    @IsString()
    @IsOptional()
    nik: string;

    @IsDateString()
    @IsOptional()
    tanggal_lahir: string;

    @IsString()
    @IsOptional()
    tempat_lahir: string;

    @IsString()
    @IsOptional()
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

    @IsString()
    @IsOptional()
    id_tenant: string;
}
