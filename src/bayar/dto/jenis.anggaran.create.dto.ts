import { IsInt, IsOptional, IsString } from 'class-validator';

export class JenisAnggaranCreateDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsInt()
    @IsOptional()
    id: number;

    @IsInt()
    @IsOptional()
    id_type_anggaran: number;
}
