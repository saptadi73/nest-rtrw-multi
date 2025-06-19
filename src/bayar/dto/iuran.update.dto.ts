import { IsInt, IsOptional, IsString } from 'class-validator';

export class IuranUpdateDto {
    @IsInt()
    @IsOptional()
    iuran: number;

    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
