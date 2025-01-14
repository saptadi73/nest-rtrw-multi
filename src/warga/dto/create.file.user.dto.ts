import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateFileUserDto {
    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    keterangan: string;

    @IsString()
    id_user: string;
}
