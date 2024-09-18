import { IsString } from 'class-validator';

export class TypeCreateDto {
    @IsString()
    nama: string;
}
