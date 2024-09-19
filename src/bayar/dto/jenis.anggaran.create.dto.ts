import { IsOptional, IsString } from 'class-validator';

export class JenisAnggaranCreateDto {
    @IsString()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;
}
