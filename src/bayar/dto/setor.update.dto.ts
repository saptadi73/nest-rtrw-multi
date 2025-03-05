import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class SetorUpdateDto {
    @IsNumber()
    @IsOptional()
    id_kk: number;

    @IsInt()
    @IsOptional()
    nilai: number;

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    id_iuran: number;

    @IsDateString()
    @IsOptional()
    tanggal: string;

    @IsString()
    @IsOptional()
    keterangan: string;
}
