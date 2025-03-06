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
import { TypeAnggaranCreateDto } from './dto/type.anggaran.create.dto';
import { IuranUpdateDto } from './dto/iuran.update.dto';
import { IuranCreateDto } from './dto/iuran.create.dto';

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

    @Post('update/jenis/anggaran')
    @Header('Content-Type', 'application/json')
    async ubahJenisAnggaran(@Body() tambahJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            return this.bayar.updateJenisAnggaran(tambahJenisAnggaran);
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

    @Post('delete/jenis/anggaran')
    @Header('Content-Type', 'application/json')
    async ilanginJenisAnggaran(@Body() tambahJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            return this.bayar.deleteJenisAnggaran(tambahJenisAnggaran);
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

    @Post('list/jenis/anggaran')
    @Header('Content-Type', 'application/json')
    async listJenisAnggaranPemasukan(@Body() jenisAnggaran: JenisAnggaranCreateDto) {
        try {
            return this.bayar.listJenisAnggaran(jenisAnggaran);
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

    @Get('list/type/anggaran')
    async listTypeAnggaran() {
        try {
            return this.bayar.listTypeAnggaran();
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

    @Post('find/jenis/anggaran')
    @Header('Content-Type', 'application/json')
    async findAnggaran(@Body() updateJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            return this.bayar.findJenisAnggaran(updateJenisAnggaran);
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

    @Get('jumlah/iuran')
    async jmLIuranAll() {
        try {
            return this.bayar.jumlahIuranBulanan();
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

    @Get('jumlah/anggaran/masuk')
    async jmlAnggaranMasuk() {
        try {
            return this.bayar.jumlahAnggaranMasuk();
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

    @Get('jumlah/anggaran/keluar')
    async jumlahAnggaranKeluar() {
        try {
            return this.bayar.jumlahAnggaranKeluar();
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

    @Get('jumlah/warga/iuran')
    async jumlahWargaIuran() {
        try {
            return this.bayar.jmlWargaIuran();
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

    @Get('daftar/setor')
    async daftarWargaSetor() {
        try {
            return this.bayar.listWargaIuran();
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

    @Get('daftar/pemasukan')
    async daftarPemasukan() {
        try {
            return this.bayar.listAllPemasukan();
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

    @Get('daftar/pengeluaran')
    async daftarPengeluaran() {
        try {
            return this.bayar.listAllPengeluaran();
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

    @Get('iuran/bulanan')
    async iuranBulan() {
        try {
            return this.bayar.iuranBulan();
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

    @Get('masuk/bulanan')
    async masukBulan() {
        try {
            return this.bayar.pemasukanBulan();
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

    @Get('keluar/bulanan')
    async keluarBulan() {
        try {
            return this.bayar.pengeluaranBulan();
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

    @Post('add/typeanggaran')
    @Header('Content-Type', 'application/json')
    async createTypeAnggaran(@Body() createTypeAnggaran: TypeAnggaranCreateDto) {
        try {
            return this.bayar.createTypeAnggaran(createTypeAnggaran);
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

    @Post('create/iuran')
    @Header('Content-Type', 'application/json')
    async createIuran(@Body() createIuran: IuranCreateDto) {
        try {
            return this.bayar.createIuran(createIuran);
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

    @Post('edit/iuran')
    @Header('Content-Type', 'application/json')
    async editIuran(@Body() updateIuran: IuranUpdateDto) {
        try {
            return this.bayar.editIuran(updateIuran);
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

    @Post('delete/iuran')
    @Header('Content-Type', 'application/json')
    async hapusIuran(@Body() updateIuran: IuranUpdateDto) {
        try {
            return this.bayar.deleteIuran(updateIuran);
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

    @Post('find/iuran')
    @Header('Content-Type', 'application/json')
    async findIuran(@Body() Iuran: IuranUpdateDto) {
        try {
            return this.bayar.findJenisIuran(Iuran);
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

    @Get('setor/kk/:id')
    async setorKk(@Param('id') id: string) {
        try {
            return this.bayar.listSetoranKK(id);
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

    @Post('delete/setor')
    @Header('Content-Type', 'application/json')
    async hapusSetoran(@Body() setoran: SetorUpdateDto) {
        try {
            return this.bayar.deleteSetoran(setoran);
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

    @Post('del/setor/anggaran')
    @Header('Content-Type', 'application/json')
    async hapusSetoranAnggaran(@Body() setoran: SetorUpdateDto) {
        try {
            return this.bayar.deleteSetorAnggaran(setoran);
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
