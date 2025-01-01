import { IsString } from 'class-validator';

export class TypeAnggaranCreateDto {
    @IsString()
    type: string;
}
