import { IsOptional, IsString } from 'class-validator';

export class CreateFileBuktiDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
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

    @IsString()
    @IsOptional()
    id_tenant: string;
}
