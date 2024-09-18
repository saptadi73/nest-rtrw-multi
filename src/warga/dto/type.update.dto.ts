import { IsInt, IsString } from 'class-validator';

export class TypeUpdateDto {
    @IsString()
    nama: string;

    @IsInt()
    id: number;
}
