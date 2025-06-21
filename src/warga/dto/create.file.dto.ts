import { IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_warga: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
