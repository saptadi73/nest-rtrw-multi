import { IsOptional, IsString } from 'class-validator';

export class BiayaCreateDto {
    @IsString()
    jenis_biaya: string;

    @IsString()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
