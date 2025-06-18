import { IsNumber, IsOptional, IsString } from 'class-validator';

export class StatusWargaDto {
    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
