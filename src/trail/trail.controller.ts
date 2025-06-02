import { Body, Controller, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TrailService } from './trail.service';
import { WriteTrailDto } from './dto/write.trail.dto';

@Controller('trail')
export class TrailController {
    constructor(private readonly trailService: TrailService) {}

    @Post('write')
    @Header('Content-Type', 'application/json')
    async writeTrail(@Body() trail: WriteTrailDto) {
        try {
            return await this.trailService.WriteTrailLog(trail);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }
}
