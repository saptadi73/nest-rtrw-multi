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
import { JenisAnggaranCreateDto } from './dto/jenis.anggaran.create.dto';
import { AnggaranCreateDto } from './dto/anggaran.create.dto';
import { AnggaranUpdateDto } from './dto/anggaran.update.dto';
import { SetorUpdateDto } from './dto/setor.update.dto';
import { LaporanSetoranDto } from './dto/laporan.setoran.dto';
import { LaporanAnggaranDto } from './dto/laporan.anggaran.dto';
import { HitungHutangDto } from './dto/hitung.hutang.dto';

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

    @Post('add/jenis/anggaran')
    @Header('Content-Type', 'application/json')
    async tambahJenisAnggaran(@Body() tambahJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            return this.bayar.addJenisAnggaran(tambahJenisAnggaran);
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

    @Get('list/jenis/anggaran')
    async listJenisAnggaran() {
        try {
            return this.bayar.listJenisAnggaran();
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

    @Post('add/anggaran')
    @Header('Content-Type', 'application/json')
    async addAnggaran(@Body() createAnggaran: AnggaranCreateDto) {
        try {
            return this.bayar.tambahAnggaran(createAnggaran);
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

    @Post('update/anggaran')
    @Header('Content-Type', 'application/json')
    async editAnggaran(@Body() updateAnggaran: AnggaranUpdateDto) {
        try {
            return this.bayar.tambahAnggaran(updateAnggaran);
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

    @Get('cari/setor/:id')
    async findDataSetor(@Param('id') id: string) {
        try {
            return this.bayar.FindSetoran(id);
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

    @Post('update/anggaran')
    @Header('Content-Type', 'application/json')
    async updateAnggaran(updateAnggaranbku: AnggaranUpdateDto) {
        try {
            return this.bayar.editAnggaran(updateAnggaranbku);
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

    @Post('update/setoran')
    @Header('Content-Type', 'application/json')
    async updateSetoran(updateSetoran: SetorUpdateDto) {
        try {
            return this.bayar.updateSetor(updateSetoran);
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

    @Get('find/anggaran/:id')
    async cariAnggaran(@Param('id') id: string) {
        try {
            return this.bayar.findAnggaran(id);
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

    @Post('list/setoran')
    @Header('Content-Type', 'application/json')
    async daftarSetoran(@Body() laporanTanggal: LaporanSetoranDto) {
        try {
            return this.bayar.listSetoran(laporanTanggal);
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

    @Post('list/anggaran')
    @Header('Content-Type', 'application/json')
    async daftarAnggaran(@Body() laporanAnggaran: LaporanAnggaranDto) {
        try {
            return this.bayar.listAnggaran(laporanAnggaran);
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

    @Post('list/belum')
    @Header('Content-Type', 'application/json')
    async belumBayarIuran(@Body() hutangHitung: HitungHutangDto) {
        try {
            return this.bayar.listBelumBayar(hutangHitung);
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
