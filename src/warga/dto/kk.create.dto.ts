import { IsInt, IsString } from 'class-validator';

export class KkCreateDto {
    @IsString()
    no_kk: string;

    @IsInt()
    no_blok: number;

    @IsInt()
    no_rumah: number;
}
