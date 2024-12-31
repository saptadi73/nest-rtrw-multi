import { IsOptional, IsString } from 'class-validator';

export class CreatePhotoUserDto {
    @IsString()
    @IsOptional()
    nama: string;

    @IsString()
    @IsOptional()
    keterangan: string;

    @IsString()
    @IsOptional()
    id_user: string;

    @IsString()
    @IsOptional()
    url: string;
}
