import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLevelDto {
    @IsString()
    nama: string;

    @IsString()
    @IsOptional()
    deskripsi: string;

    @IsInt()
    @IsOptional()
    id: number;
}
