import { IsInt, IsString } from 'class-validator';

export class IuranCreateDto {
    @IsInt()
    iuran: number;

    @IsString()
    keterangan: string;
}
