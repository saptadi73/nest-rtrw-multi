import { IsDateString, IsInt } from 'class-validator';

export class PengeluaranUpdateDto {
    @IsInt()
    id_kk: number;

    @IsInt()
    nilai: number;

    @IsInt()
    id_biaya: number;

    @IsDateString()
    tanggal: string;

    @IsInt()
    id: number;
}
