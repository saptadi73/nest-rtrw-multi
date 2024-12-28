import { IsInt, IsString } from 'class-validator';

export class KkCreateDto {
    @IsString()
    no_kk: string;

    @IsInt()
    no_blok: string;

    @IsInt()
    no_rumah: number;
}
