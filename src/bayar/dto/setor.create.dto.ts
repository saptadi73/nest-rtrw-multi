import { IsDateString, IsInt } from 'class-validator';

export class SetorCreateDto {
    @IsInt()
    id_kk: number;

    @IsInt()
    nilai: number;

    @IsInt()
    id_iuran: number;

    @IsDateString()
    tanggal: string;
}
