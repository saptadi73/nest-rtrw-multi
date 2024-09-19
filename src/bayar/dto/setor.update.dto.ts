import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class SetorUpdateDto {
    @IsInt()
    id_kk: number;

    @IsInt()
    nilai: number;

    @IsInt()
    id: number;

    @IsInt()
    id_iuran: number;

    @IsDateString()
    tanggal: string;

    @IsString()
    @IsOptional()
    keterangan: string;
}
