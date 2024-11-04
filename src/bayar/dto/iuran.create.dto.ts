import { IsInt, IsOptional, IsString } from 'class-validator';

export class IuranCreateDto {
    @IsInt()
    iuran: number;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    nama: string;
}
