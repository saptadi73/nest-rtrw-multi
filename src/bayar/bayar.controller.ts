import {
    Body,
    Controller,
    Get,
    Header,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
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
// import { TypeAnggaranCreateDto } from './dto/type.anggaran.create.dto';
import { IuranUpdateDto } from './dto/iuran.update.dto';
import { IuranCreateDto } from './dto/iuran.create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bayar')
export class BayarController {
    constructor(private bayar: Bayar) {}

    @Get('list/iuran/:id')
    async listIuran(@Param('id') id: string) {
        try {
            return this.bayar.listIuran(id);
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

    @Get('find/anggaran/warga/:id')
    async cariAnggaranWarga(@Param('id') id: string) {
        try {
            return this.bayar.findAnggaranWarga(id);
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

    @Post('list/sudah')
    @Header('Content-Type', 'application/json')
    async sudahBayarIuran(@Body() hutangHitung: HitungHutangDto) {
        try {
            return this.bayar.listSudahBayar(hutangHitung);
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

    @Get('jumlah/iuran/:id')
    async jmLIuranAll(@Param('id') id: string) {
        try {
            return this.bayar.jumlahIuranBulanan(id);
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

    @Get('jumlah/anggaran/masuk/:id')
    async jmlAnggaranMasuk(@Param('id') id: string) {
        try {
            return this.bayar.jumlahAnggaranMasuk(id);
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

    @Get('jumlah/anggaran/keluar/:id')
    async jumlahAnggaranKeluar(@Param('id') id: string) {
        try {
            return this.bayar.jumlahAnggaranKeluar(id);
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

    @Get('jumlah/warga/iuran/:id')
    async jumlahWargaIuran(@Param('id') id: string) {
        try {
            return this.bayar.jmlWargaIuran(id);
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

    @Get('daftar/setor/:id')
    async daftarWargaSetor(@Param('id') id: string) {
        try {
            return this.bayar.listWargaIuran(id);
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

    @Get('daftar/belum/setor/:id')
    async daftarWargaBelumSetor(@Param('id') id: string) {
        try {
            return this.bayar.listBelumBayarIuran(id);
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

    @Get('daftar/pemasukan/:id')
    async daftarPemasukan(@Param('id') id: string) {
        try {
            return this.bayar.listAllPemasukan(id);
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

    @Get('daftar/pengeluaran/:id')
    async daftarPengeluaran(@Param('id') id: string) {
        try {
            return this.bayar.listAllPengeluaran(id);
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

    @Get('iuran/bulanan/:id')
    async iuranBulan(@Param('id') id: string) {
        try {
            return this.bayar.iuranBulan(id);
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

    @Get('masuk/bulanan/:id')
    async masukBulan(@Param('id') id: string) {
        try {
            return this.bayar.pemasukanBulan(id);
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

    @Get('keluar/bulanan/:id')
    async keluarBulan(@Param('id') id: string) {
        try {
            return this.bayar.pengeluaranBulan(id);
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

    // @Post('add/typeanggaran')
    // @Header('Content-Type', 'application/json')
    // async createTypeAnggaran(@Body() createTypeAnggaran: TypeAnggaranCreateDto) {
    //     try {
    //         return this.bayar.createTypeAnggaran(createTypeAnggaran);
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

    @UseGuards(AuthGuard('jwt'))
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

    @Get('total/total/:id')
    async totalKabeh(@Param('id') id: string) {
        try {
            return this.bayar.totalKabeh(id);
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

    @Get('iuran/deret/bulan/:id')
    async iuranDeretBulan(@Param('id') id: string) {
        try {
            return this.bayar.totalIuranBulanan(id);
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

    @Get('masuk/deret/bulan/:id')
    async masukDeretBulan(@Param('id') id: string) {
        try {
            return this.bayar.totalMasukBulanan(id);
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

    @Get('keluar/deret/bulan/:id')
    async keluarDeretBulan(@Param('id') id: string) {
        try {
            return this.bayar.totalKeluarBulanan(id);
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

    @Get('keluar/group/:id')
    async keluarGroup(@Param('id') id: string) {
        try {
            return this.bayar.groupPengeluaran(id);
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

    @Get('laporan/rt/:id')
    async LaporanRt(@Param('id') id: string) {
        try {
            return this.bayar.laporanRt(id);
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

    @Get('get/nominal/:id')
    async getNominal(@Param('id') id: string) {
        try {
            return this.bayar.getNominal(id);
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
