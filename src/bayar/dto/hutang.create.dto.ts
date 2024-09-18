import { IsInt } from 'class-validator';

export class HutangCreateDto {
    @IsInt()
    id_kk: number;

    @IsInt()
    nilai: number;
}
