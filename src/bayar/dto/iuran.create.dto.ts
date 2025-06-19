import { IsNumber, IsOptional, IsString } from 'class-validator';

export class IuranCreateDto {
    @IsNumber()
    iuran: number;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    nama: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
