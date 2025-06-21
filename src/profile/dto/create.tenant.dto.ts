import { IsOptional, IsString } from 'class-validator';

export class CreateTenantDto {
    @IsString()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    @IsOptional()
    no_hp: string;
}
