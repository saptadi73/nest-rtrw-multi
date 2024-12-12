import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateFileKeluargaDto {
    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    keterangan: string;

    @IsString()
    id_kk: string;
}
