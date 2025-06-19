import { IsOptional, IsString } from 'class-validator';

export class TypeAnggaranCreateDto {
    @IsString()
    type: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
