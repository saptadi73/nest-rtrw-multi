import { IsInt, IsOptional, IsString } from 'class-validator';

export class KkUpdateDto {
    @IsString()
    @IsOptional()
    no_kk: string;

    @IsInt()
    @IsOptional()
    id_blok: number;

    @IsInt()
    @IsOptional()
    no_rumah: number;

    @IsInt()
    @IsOptional()
    id: number;

    @IsInt()
    @IsOptional()
    id_photo_kk: number;
}
