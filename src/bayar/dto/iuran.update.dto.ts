import { IsInt, IsOptional, IsString } from 'class-validator';

export class IuranUpdateDto {
    @IsInt()
    @IsOptional()
    iuran: number;

    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    @IsOptional()
    nama: string;
}
