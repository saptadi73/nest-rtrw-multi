import { Optional } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_warga: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
