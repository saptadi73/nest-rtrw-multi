import { IsInt, IsOptional, IsString } from 'class-validator';

export class BiayaUpdateDto {
    @IsString()
    jenis_biaya: string;

    @IsString()
    keterangan: string;

    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
