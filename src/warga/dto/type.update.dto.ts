import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TypeUpdateDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
