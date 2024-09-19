import { IsInt, IsOptional, IsString } from 'class-validator';

export class IuranCreateDto {
    @IsInt()
    @IsOptional()
    iuran: number;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    nama: string;
}
