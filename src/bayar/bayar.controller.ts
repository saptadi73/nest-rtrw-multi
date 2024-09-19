import {
    Body,
    Controller,
    Get,
    Header,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { Bayar } from './bayar';
import { SetorCreateDto } from './dto/setor.create.dto';

@Controller('bayar')
export class BayarController {
    constructor(private bayar: Bayar) {}

    @Get('list/iuran')
    async listIuran() {
        try {
            return this.bayar.listIuran();
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

    @Post('add/setor')
    @Header('Content-Type', 'application/json')
    async tambahBayar(@Body() createBayar: SetorCreateDto) {
        try {
            return this.bayar.addBayar(createBayar);
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

    @Get('cari/warga/:id')
    async cariWarga(@Param('id') id: string) {
        try {
            return this.bayar.findWarga(id);
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
