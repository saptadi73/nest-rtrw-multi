import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEntityDto {
    @IsString()
    @IsOptional()
    dusun: string;

    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    desa: string;

    @IsString()
    @IsOptional()
    kecamatan: string;

    @IsString()
    @IsOptional()
    kabupaten: string;

    @IsString()
    @IsOptional()
    provinsi: string;

    @IsNumber()
    @IsOptional()
    rt: number;

    @IsNumber()
    @IsOptional()
    rw: number;

    @IsString()
    @IsOptional()
    kode_wilayah: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
