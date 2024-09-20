import { IsInt, IsOptional, IsString } from 'class-validator';

export class JenisAnggaranCreateDto {
    @IsString()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsInt()
    @IsOptional()
    id: number;
}
