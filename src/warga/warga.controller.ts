import {
    Body,
    Controller,
    Header,
    HttpException,
    HttpStatus,
    Post,
    Get,
    UploadedFile,
    UseInterceptors,
    Param,
} from '@nestjs/common';
import { Warga } from './warga';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FILE_UPLOAD_DIR } from './constantan.main';
import { FileNameEditor, ImageFileFilter } from './file.utils';
import { CreateFileDto } from './dto/create.file.dto';
import { KkCreateDto } from './dto/kk.create.dto';
import { WargaCreateDto } from './dto/warga.create.dto';

@Controller('warga')
export class WargaController {
    constructor(private Warga: Warga) {}

    @Post('photo')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: FILE_UPLOAD_DIR,
            }),
            limits: {
                fileSize: 1000 * 1000 * 10,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreateFileDto
    ) {
        try {
            return this.Warga.photoUpload(fileuploaddto, file);
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

    @Post('add/kk')
    @Header('Content-Type', 'application/json')
    async tambahKK(@Body() createKK: KkCreateDto) {
        try {
            return this.Warga.createKK(createKK);
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

    @Get('list/kk')
    async listKK() {
        try {
            return this.Warga.listKK();
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

    @Get('list/type')
    async listType() {
        try {
            return this.Warga.listType();
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

    @Post('add/warga')
    @Header('Content-Type', 'application/json')
    async tambahWarga(@Body() createWarga: WargaCreateDto) {
        try {
            return this.Warga.createWarga(createWarga);
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

    @Get('list/warga/:id')
    async listWargaKK(@Param('id') id: string) {
        try {
            return this.Warga.listWargaPerKK(id);
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

    @Get('list/all')
    async listWargaAll() {
        try {
            return this.Warga.listAllWarga();
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

    @Get('find/kk/:id')
    async cariWarga(@Param('id') id: string) {
        try {
            return this.Warga.findKK(id);
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
    @Post('update/kk/:id')
    @Header('Content-Type', 'application/json')
    async updateKK(id) {
        try {
            return this.Warga.updateKK(id);
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

    @Post('update/warga/:id')
    @Header('Content-Type', 'application/json')
    async updateWarga(id) {
        try {
            return this.Warga.updateWarga(id);
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
