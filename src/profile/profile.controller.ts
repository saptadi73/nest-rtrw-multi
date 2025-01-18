import { Body, Controller, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Profile } from './profile';
import { CreateEntityDto } from './dto/create.entity.dto';
import { CreatePolygonDto } from './dto/create.polygon.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profile: Profile) {}

    @Post('create')
    @Header('Content-Type', 'application/json')
    async buatEntity(@Body() createEntity: CreateEntityDto) {
        try {
            return this.profile.createProfile(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('edit')
    @Header('Content-Type', 'application/json')
    async editEntity(@Body() createEntity: CreateEntityDto) {
        try {
            return this.profile.editProfile(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('new/polygon')
    @Header('Content-Type', 'application/json')
    async buatPolygon(@Body() createEntity: CreatePolygonDto) {
        try {
            return this.profile.createPolygon(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('edit/polygon')
    @Header('Content-Type', 'application/json')
    async editPolygon(@Body() createEntity: CreatePolygonDto) {
        try {
            return this.profile.editPolygon(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }
}
