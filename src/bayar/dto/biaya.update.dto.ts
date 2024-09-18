import { IsInt, IsString } from 'class-validator';

export class BiayaUpdateDto {
    @IsString()
    jenis_biaya: string;

    @IsString()
    keterangan: string;

    @IsInt()
    id: number;
}
