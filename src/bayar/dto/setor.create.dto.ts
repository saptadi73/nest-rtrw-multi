import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class SetorCreateDto {
    @IsInt()
    id_kk: number;

    @IsInt()
    nilai: number;

    @IsInt()
    id_iuran: number;

    @IsDateString()
    tanggal: string;

    @IsString()
    @IsOptional()
    keterangan: string;
}
