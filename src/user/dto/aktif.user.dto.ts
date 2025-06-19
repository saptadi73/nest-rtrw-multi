import { IsString, IsOptional } from 'class-validator';

export class AktifUserDto {
    @IsString()
    uuid: string;

    @IsString()
    @IsOptional()
    id_tenant: string;
}
