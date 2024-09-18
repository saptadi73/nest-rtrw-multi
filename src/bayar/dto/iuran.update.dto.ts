import { IsInt, IsOptional, IsString } from 'class-validator';

export class IuranUpdateDto {
    @IsInt()
    @IsOptional()
    iuran: number;

    @IsInt()
    id: number;

    @IsString()
    keterangan: string;
}
