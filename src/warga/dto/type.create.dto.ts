import { IsOptional, IsString } from 'class-validator';

export class TypeCreateDto {
    @IsString()
    nama: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
