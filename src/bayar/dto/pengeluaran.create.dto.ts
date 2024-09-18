import { IsDateString, IsInt } from 'class-validator';

export class PengeluaranCreateDto {
    @IsInt()
    id_kk: number;

    @IsInt()
    nilai: number;

    @IsInt()
    id_biaya: number;

    @IsDateString()
    tanggal: string;
}
