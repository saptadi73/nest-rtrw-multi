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
    UseFilters,
    Delete,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { Warga } from './warga';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileNameEditor, ImageFileFilter } from './file.utils';
import { CreateFileDto } from './dto/create.file.dto';
import { KkCreateDto } from './dto/kk.create.dto';
import { WargaCreateDto } from './dto/warga.create.dto';
import { KkUpdateDto } from './dto/kk.update.dto';
import { WargaUpdateDto } from './dto/warga.update.dto';
import { CreateFileKeluargaDto } from './dto/create.file.keluarga.dto';
import { BlokCreateDto } from './dto/blok.create.dto';
// import { TypeCreateDto } from './dto/type.create.dto';
// import { TypeUpdateDto } from './dto/type.update.dto';
import { CreateFileUserDto } from './dto/create.file.user.dto';
import { CreateGpsLocationDto } from './dto/create.gps.location.dto';
import { MulterExceptionFilter } from './filter/multer.exception.filter';
import { PekerjaanWargaDto } from './dto/pekerjaan.warga.dto';
import { StatusWargaDto } from './dto/status.warga.dto';
import { CreateFileBuktiDto } from './dto/create.file.bukti.dto';
import { join } from 'path';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';

@Controller('warga')
export class WargaController {
    constructor(private Warga: Warga) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('photo')
    @UseFilters(MulterExceptionFilter)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: './uploads',
            }),
            limits: {
                fileSize: 300 * 1024,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreateFileDto
    ) {
        try {
            if (!file) {
                throw new Error('File upload failed');
            } else {
                return this.Warga.photoUploadWarga(fileuploaddto, file);
            }
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

    @UseGuards(AuthGuard('jwt'))
    @Post('photo/user')
    @UseFilters(MulterExceptionFilter)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: './uploads',
            }),
            limits: {
                fileSize: 300 * 1024,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadPhotoUser(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreateFileUserDto
    ) {
        try {
            if (!file) {
                throw new Error('File upload failed');
            } else {
                return this.Warga.photoUploadUser(fileuploaddto, file);
            }
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

    @UseGuards(AuthGuard('jwt'))
    @Post('fotoktp')
    @UseFilters(MulterExceptionFilter)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: './uploads',
            }),
            limits: {
                fileSize: 300 * 1024,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadKTP(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreateFileDto
    ) {
        try {
            if (!file) {
                throw new Error('File upload failed');
            } else {
                return this.Warga.photoUploadWarga(fileuploaddto, file);
            }
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

    @UseGuards(AuthGuard('jwt'))
    @Post('fotokk')
    @UseFilters(MulterExceptionFilter)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: './uploads',
            }),
            limits: {
                fileSize: 300 * 1024,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadKk(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreateFileKeluargaDto
    ) {
        try {
            if (!file) {
                throw new Error('File upload failed');
            } else {
                return this.Warga.UploadKK(fileuploaddto, file);
            }
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

    @UseGuards(AuthGuard('jwt'))
    @Post('delete/fotokk')
    async deleteKk(@Body() filedelete: CreateFileKeluargaDto) {
        try {
            return this.Warga.deleteFileKK(filedelete);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('delete/bukti')
    async deleteBukti(@Body() filedelete: CreateFileBuktiDto) {
        try {
            return this.Warga.deleteFileBukti(filedelete);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('delete/fotoktp')
    async deleteKtp(@Body() filedelete: CreateFileKeluargaDto) {
        try {
            return this.Warga.deleteFileKTP(filedelete);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('bukti')
    @UseFilters(MulterExceptionFilter)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: './uploads',
            }),
            limits: {
                fileSize: 300 * 1024,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadBukti(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreateFileBuktiDto
    ) {
        try {
            if (!file) {
                throw new Error('File upload failed');
            } else {
                return this.Warga.UploadBuktiAnggaran(fileuploaddto, file);
            }
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

    @UseGuards(AuthGuard('jwt'))
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

    @Get('list/kk/:id')
    async listKK(@Param('id') id: string) {
        try {
            return this.Warga.listKK(id);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('add/blok')
    @Header('Content-Type', 'application/json')
    async tambahBlok(@Body() createBlok: BlokCreateDto) {
        try {
            return this.Warga.createBlok(createBlok);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('edit/blok')
    @Header('Content-Type', 'application/json')
    async ubahBlok(@Body() createBlok: BlokCreateDto) {
        try {
            return this.Warga.editBlok(createBlok);
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

    @Get('daftar/blok/:id')
    async listBlok(@Param('id') id: string) {
        try {
            return this.Warga.listBlok(id);
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

    @Get('cari/blok/:id')
    async cariBlok(@Param('id') id: string) {
        try {
            return this.Warga.findBlok(id);
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

    // @UseGuards(AuthGuard('jwt'))
    // @Post('tambah/type')
    // async addTyoe(@Body() data: TypeCreateDto) {
    //     try {
    //         return this.Warga.createType(data);
    //     } catch (error) {
    //         throw new HttpException(
    //             {
    //                 status: HttpStatus.FORBIDDEN,
    //                 message: 'Forbidden Access',
    //             },
    //             HttpStatus.FORBIDDEN,
    //             {
    //                 cause: error,
    //             }
    //         );
    //     }
    // }

    @Get('daftar/type')
    async daftarType() {
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

    @Get('cari/type/:id')
    async cariType(@Param('id') id: string) {
        try {
            return this.Warga.findType(id);
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

    // @UseGuards(AuthGuard('jwt'))
    // @Post('update/type')
    // @Header('Content-Type', 'application/json')
    // async editType(@Body() data: TypeUpdateDto) {
    //     try {
    //         return this.Warga.updateType(data);
    //     } catch (error) {
    //         throw new HttpException(
    //             {
    //                 status: HttpStatus.FORBIDDEN,
    //                 message: 'Forbidden Access',
    //             },
    //             HttpStatus.FORBIDDEN,
    //             {
    //                 cause: error,
    //             }
    //         );
    //     }
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Post('hapus/type')
    // @Header('Content-Type', 'application/json')
    // async busekType(@Body() updateType: TypeUpdateDto) {
    //     try {
    //         return this.Warga.deleteType(updateType);
    //     } catch (error) {
    //         throw new HttpException(
    //             {
    //                 status: HttpStatus.FORBIDDEN,
    //                 message: 'Forbidden Access',
    //             },
    //             HttpStatus.FORBIDDEN,
    //             {
    //                 cause: error,
    //             }
    //         );
    //     }
    // }

    @Get('list/type/:id')
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

    @UseGuards(AuthGuard('jwt'))
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

    @Get('list/all/:id')
    async listWargaAll(@Param('id') id: string) {
        try {
            return this.Warga.listAllWarga(id);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('update/kk/:id')
    @Header('Content-Type', 'application/json')
    async updateKK(@Param('id') id: string, @Body() updateKK: KkUpdateDto) {
        try {
            return this.Warga.updateKK(id, updateKK);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('update/warga/:id')
    @Header('Content-Type', 'application/json')
    async updateWarga(@Param('id') id: string, @Body() updateWarga: WargaUpdateDto) {
        try {
            return this.Warga.updateWarga(id, updateWarga);
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

    @Get('find/warga/:id')
    async findWarga(@Param('id') id: string) {
        try {
            return this.Warga.findWarga(id);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('del/warga')
    @Header('Content-Type', 'application/json')
    async hapusWargaSatu(@Body() update: WargaUpdateDto) {
        try {
            return this.Warga.deleteWarga(update);
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

    @Get('jumlah/kk/:id')
    async jumlahKKku(@Param('id') id: string) {
        try {
            return this.Warga.jumlahKK(id);
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

    @Get('jumlah/warga/:id')
    async jumlahwargaku(@Param('id') id: string) {
        try {
            return this.Warga.jumlahWarga(id);
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

    @Get('jumlah/warga/lk/:id')
    async jumlahWargaLk(@Param('id') id: string) {
        try {
            return this.Warga.jumlahWargaLk(id);
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

    @Get('jumlahwarga/pr/:id')
    async jumlahWargaPr(@Param('id') id: string) {
        try {
            return this.Warga.jumlahWargaPr(id);
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

    @Get('jumlah/kk/all/:id')
    async jumlahKKAll(@Param('id') id: string) {
        try {
            return this.Warga.jumlahKK(id);
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

    @Get('jumlah/warga/all/:id')
    async jumlahWargaAll(@Param('id') id: string) {
        try {
            return this.Warga.jumlahWarga(id);
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

    @Get('jumlah/warga/lk/:id')
    async jumlahLK(@Param('id') id: string) {
        try {
            return this.Warga.jumlahWargaLk(id);
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

    @Get('jumlah/warga/pr/:id')
    async jumlahWargaWn(@Param('id') id: string) {
        try {
            return this.Warga.jumlahWargaPr(id);
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

    @Get('daftar/warga/lk/:id')
    async WargaLk(@Param('id') id: string) {
        try {
            return this.Warga.listAllWargaLk(id);
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

    @Get('daftar/warga/pr/:id')
    async WargaPr(@Param('id') id: string) {
        try {
            return this.Warga.listAllWargaPr(id);
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

    @Get('viewkk/:id')
    async viewKk(@Param('id') id: string) {
        try {
            return this.Warga.getPhotoKK(id);
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

    @Get('viewktp/:id')
    async viewKtp(@Param('id') id: string) {
        try {
            return this.Warga.getPhotoKTP(id);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('new/gps')
    @Header('Content-Type', 'application/json')
    async buatPolygon(@Body() createEntity: CreateGpsLocationDto) {
        try {
            return this.Warga.createGPSLocationKK(createEntity);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('edit/gps')
    @Header('Content-Type', 'application/json')
    async editPolygon(@Body() createEntity: CreateGpsLocationDto) {
        try {
            return this.Warga.editGPSLocationKK(createEntity);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('tambah/pekerjaan')
    @Header('Content-Type', 'application/json')
    async tambahPekerjaan(@Body() pekerjaan: PekerjaanWargaDto) {
        try {
            return this.Warga.TambahPekerjaan(pekerjaan);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('update/pekerjaan')
    @Header('Content-Type', 'application/json')
    async updatePekerjaan(@Body() pekerjaan: PekerjaanWargaDto) {
        try {
            return this.Warga.updatePekerjaan(pekerjaan);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('tambah/status')
    @Header('Content-Type', 'application/json')
    async tambahStatus(@Body() status_warga: StatusWargaDto) {
        try {
            return this.Warga.tambahStatusWarga(status_warga);
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

    @Post('update/status')
    @Header('Content-Type', 'application/json')
    async gantiStatus(@Body() status_warga: StatusWargaDto) {
        try {
            return this.Warga.updateStatusWarga(status_warga);
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

    @Post('hapus/status')
    @Header('Content-Type', 'application/json')
    async hapusStatus(@Body() status_warga: StatusWargaDto) {
        try {
            return this.Warga.deleteStatusWarga(status_warga);
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

    @Get('list/pekerjaan/:id')
    async listPekerjaan(@Param('id') id: string) {
        try {
            return this.Warga.listPekerjaan(id);
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

    @Get('list/status/:id')
    async listStatus(@Param('id') id: string) {
        try {
            return this.Warga.listStatusWarga(id);
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

    @Get('delete/rumah/:id')
    @Header('Content-Type', 'application/json')
    async delRumah(@Param('id') id: string) {
        try {
            return this.Warga.delKK(id);
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
    @Get('delete/wargakk/:id')
    @Header('Content-Type', 'application/json')
    async delRumahKK(@Param('id') id: string) {
        try {
            return this.Warga.delWargaKK(id);
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

    @Post('hapus/pekerjaan')
    @Header('Content-Type', 'application/json')
    async delPekerjaan(@Body() pekerjaan: PekerjaanWargaDto) {
        try {
            return this.Warga.deletePekerjaan(pekerjaan);
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

    @Delete(':filename')
    deleteFile(@Param('filename') filename: string) {
        const filePath = join(process.cwd(), 'uploads', filename);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                throw new NotFoundException('Failed to delete file');
            }
        });

        return { message: 'File deleted successfully' };
    }
}
