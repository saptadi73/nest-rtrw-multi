import { IsOptional, IsString } from 'class-validator';

export class FindWilayahDto {
    @IsString()
    @IsOptional()
    kode: string;

    @IsString()
    @IsOptional()
    wilayah: string;
}
