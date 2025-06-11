import { IsInt, IsOptional, IsString } from 'class-validator';

export class KkUpdateDto {
    @IsString()
    @IsOptional()
    no_kk: string;

    @IsInt()
    @IsOptional()
    id_blok: number;

    @IsString()
    @IsOptional()
    no_rumah: string;

    @IsInt()
    @IsOptional()
    id: number;

    @IsInt()
    @IsOptional()
    id_photo_kk: number;
}
