import { IsInt, IsString } from 'class-validator';

export class KkCreateDto {
    @IsString()
    no_kk: string;

    @IsInt()
    id_blok: number;

    @IsInt()
    no_rumah: number;
}
