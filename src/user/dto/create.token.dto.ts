import { IsInt, IsString } from 'class-validator';

export class CreateTokenDto {
    @IsString()
    token: string;

    @IsInt()
    id_user: number;
}
