import { Optional } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

export class CreateFileUserDto {
    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_user: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
