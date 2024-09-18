import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    @Optional()
    nama: string;

    @IsString()
    @Optional()
    keterangan: string;
}
