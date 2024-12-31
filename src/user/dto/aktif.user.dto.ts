import { IsString } from 'class-validator';

export class AktifUserDto {
    @IsString()
    uuid: string;
}
