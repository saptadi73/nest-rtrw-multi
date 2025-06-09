import { Optional } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

export class CreateFileBuktiDto {
    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_anggaran: string;

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    url: string;
}
