import { IsNumber, IsOptional } from 'class-validator';

export class CreatePolygonDto {
    @IsNumber()
    @IsOptional()
    latitude: number;

    @IsNumber()
    @IsOptional()
    longitude: number;

    @IsNumber()
    @IsOptional()
    id: number;
}
