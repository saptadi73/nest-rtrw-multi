import { IsOptional, IsString } from 'class-validator';

export class CreateFileKeluargaDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_kk: string;

    @IsString()
    @IsOptional()
    url: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
