import { Injectable } from '@nestjs/common';
import { PrismaBayarService } from './prisma.bayar.service';
import { IuranCreateDto } from './dto/iuran.create.dto';
import { Prisma } from '@prisma/client';
import { SetorCreateDto } from './dto/setor.create.dto';
import { SetorUpdateDto } from './dto/setor.update.dto';
import { IuranUpdateDto } from './dto/iuran.update.dto';
import { HitungHutangDto } from './dto/hitung.hutang.dto';
import { BiayaCreateDto } from './dto/biaya.create.dto';
import { BiayaUpdateDto } from './dto/biaya.update.dto';
import { PengeluaranCreateDto } from './dto/pengeluaran.create.dto';
import { PengeluaranUpdateDto } from './dto/pengeluaran.update.dto';
import { JenisAnggaranCreateDto } from './dto/jenis.anggaran.create.dto';
import { AnggaranCreateDto } from './dto/anggaran.create.dto';
import { AnggaranUpdateDto } from './dto/anggaran.update.dto';
import { LaporanSetoranDto } from './dto/laporan.setoran.dto';
import { toZonedTime } from 'date-fns-tz';
import { LaporanAnggaranDto } from './dto/laporan.anggaran.dto';

@Injectable()
export class Bayar {
    constructor(private prisma: PrismaBayarService) {}

    async createIuran(createIuran: IuranCreateDto) {
        try {
            const addIuran = await this.prisma.iuran.create({
                data: {
                    iuran: createIuran.iuran,
                    nama: createIuran.nama,
                    keterangan: createIuran.keterangan,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah iuran',
                result: addIuran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data type warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data type warga', data: error };
        }
    }

    async addBayar(createBayar: SetorCreateDto) {
        try {
            const dateString = createBayar.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            const tambahBayar = await this.prisma.setor.create({
                data: {
                    kk: {
                        connect: {
                            id: createBayar.id_kk,
                        },
                    },
                    iuran: {
                        connect: {
                            id: createBayar.id_iuran,
                        },
                    },
                    keterangan: createBayar.keterangan,
                    nilai: createBayar.nilai,
                    tanggal: isoDate,
                },
            });

            return {
                status: 'ok',
                message: 'berhasil tambah setoran',
                result: tambahBayar,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah setoran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah setoran', data: error };
        }
    }

    async editIuran(createIuran: IuranUpdateDto) {
        try {
            const addIuran = await this.prisma.iuran.update({
                data: {
                    iuran: createIuran.iuran,
                    keterangan: createIuran.keterangan,
                },
                where: {
                    id: createIuran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil update iuran',
                result: addIuran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal update karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal update iuran', data: error };
        }
    }

    async editBayar(createBayar: SetorUpdateDto) {
        try {
            const dateString = createBayar.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            const tambahBayar = await this.prisma.setor.update({
                data: {
                    kk: {
                        connect: {
                            id: createBayar.id_kk,
                        },
                    },
                    iuran: {
                        connect: {
                            id: createBayar.id_iuran,
                        },
                    },
                    nilai: createBayar.nilai,
                    tanggal: isoDate,
                },
                where: {
                    id: createBayar.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah setoran',
                result: tambahBayar,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah setoran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah setoran', data: error };
        }
    }

    async listIuran() {
        try {
            const allIuran = await this.prisma.iuran.findMany({
                select: {
                    id: true,
                    iuran: true,
                    keterangan: true,
                    nama: true,
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data iuran',
                result: allIuran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data iuran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data iuran', data: error };
        }
    }

    async listSetoran(laporanTanggal: LaporanSetoranDto) {
        try {
            const dateString_awal = laporanTanggal.tanggal_awal;
            const date_awal = new Date(dateString_awal);
            date_awal.setHours(date_awal.getHours() + 7);

            const isoDate_awal = date_awal.toISOString();

            const dateString_akhir = laporanTanggal.tanggal_akhir;
            const date_akhir = new Date(dateString_akhir);
            date_akhir.setHours(date_akhir.getHours() + 7);

            const isoDate_akhir = date_akhir.toISOString();
            const listSetoran = await this.prisma.setor.findMany({
                select: {
                    id: true,
                    kk: {
                        select: {
                            id: true,
                            no_blok: true,
                            no_rumah: true,
                            warga: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                                where: {
                                    type: {
                                        nama: 'kepala keluarga',
                                    },
                                },
                            },
                        },
                    },
                    nilai: true,
                    tanggal: true,
                    iuran: {
                        select: {
                            id: true,
                            iuran: true,
                            keterangan: true,
                        },
                    },
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                lte: isoDate_akhir,
                                gte: isoDate_awal,
                            },
                        },
                        {
                            iuran: {
                                id: laporanTanggal.iuran,
                            },
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data setoran',
                result: listSetoran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data setoran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data setoran', data: error };
        }
    }

    async listBelumBayar(hutang: HitungHutangDto) {
        try {
            const month = hutang.bulan; // September
            const year = hutang.tahun;
            // Create start and end date for the month
            const startDate = new Date(year, month - 1, 1); // September 1, 2023
            const endDate = new Date(year, month, 1); // October 1, 2023
            const wargaBayarBulan = await this.prisma.setor.findMany({
                select: {
                    kk: {
                        select: {
                            id: true,
                        },
                    },
                },
                where: {
                    tanggal: {
                        gte: startDate,
                        lt: endDate,
                    },
                },
            });

            const WargaGakBayar = await this.prisma.kk.findMany({
                select: {
                    id: true,
                    no_blok: true,
                    no_rumah: true,
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                        },
                        where: {
                            type: {
                                nama: 'kepala keluarga',
                            },
                        },
                    },
                },
                where: {
                    id: {
                        notIn: wargaBayarBulan.map((setor) => setor.kk.id),
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data warga gak bayar',
                result: WargaGakBayar,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal berhasil dapat data warga gak bayar karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat berhasil dapat data warga gak bayar',
                data: error,
            };
        }
    }

    async addBiaya(createBiaya: BiayaCreateDto) {
        try {
            const tambahBiaya = await this.prisma.biaya.create({
                data: {
                    nama: createBiaya.jenis_biaya,
                    keterangan: createBiaya.keterangan,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah biaya',
                result: tambahBiaya,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah biaya karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah biaya',
                data: error,
            };
        }
    }

    async editBiaya(createBiaya: BiayaUpdateDto) {
        try {
            const tambahBiaya = await this.prisma.biaya.update({
                data: {
                    nama: createBiaya.jenis_biaya,
                    keterangan: createBiaya.keterangan,
                },
                where: {
                    id: createBiaya.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil edit biaya',
                result: tambahBiaya,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal edit biaya karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal edit biaya',
                data: error,
            };
        }
    }

    async addPengeluaran(addPengeluaran: PengeluaranCreateDto) {
        try {
            const dateString = addPengeluaran.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            const tambahPengeluaran = await this.prisma.pengeluaran.create({
                data: {
                    nilai: addPengeluaran.nilai,
                    tanggal: isoDate,
                    kk: {
                        connect: {
                            id: addPengeluaran.id_kk,
                        },
                    },
                    biaya: {
                        connect: {
                            id: addPengeluaran.id_biaya,
                        },
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah pengeluaran',
                result: tambahPengeluaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah pengeluaran',
                data: error,
            };
        }
    }

    async editPengeluaran(addPengeluaran: PengeluaranUpdateDto) {
        try {
            const dateString = addPengeluaran.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            const tambahPengeluaran = await this.prisma.pengeluaran.update({
                data: {
                    nilai: addPengeluaran.nilai,
                    tanggal: isoDate,
                    kk: {
                        connect: {
                            id: addPengeluaran.id_kk,
                        },
                    },
                    biaya: {
                        connect: {
                            id: addPengeluaran.id_biaya,
                        },
                    },
                },
                where: {
                    id: addPengeluaran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah pengeluaran',
                result: tambahPengeluaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah pengeluaran',
                data: error,
            };
        }
    }

    async findWarga(id_kk) {
        try {
            const id_kkku = parseInt(id_kk);

            const cariWargaku = await this.prisma.warga.findFirst({
                select: {
                    nama: true,
                    no_hp: true,
                    nik: true,
                    tanggal_lahir: true,
                    tempat_lahir: true,
                    type: {
                        select: {
                            id: true,
                            nama: true,
                        },
                    },
                },
                where: {
                    AND: [
                        {
                            kk: {
                                id: id_kkku,
                            },
                        },
                        {
                            id_type: 1,
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil lihat Warga',
                result: cariWargaku,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data warga',
                data: error,
            };
        }
    }

    async addJenisAnggaran(createJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            const addJenisAnggaran = await this.prisma.jenis_anggaran.create({
                data: {
                    nama: createJenisAnggaran.nama,
                    keterangan: createJenisAnggaran.keterangan,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil menambah Jenis Anggaran',
                result: addJenisAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah jenis Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah Jenis Anggaran',
                data: error,
            };
        }
    }

    async listJenisAnggaran() {
        try {
            const DaftarJenisAnggaran = await this.prisma.jenis_anggaran.findMany({
                select: {
                    id: true,
                    nama: true,
                    keterangan: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil mendapatkan daftar jenis anggaran',
                result: DaftarJenisAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat jenis Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal lihat jenis Anggaran',
                data: error,
            };
        }
    }

    async tambahAnggaran(createAnggaran: AnggaranCreateDto) {
        try {
            const dateString = createAnggaran.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            let typeku = true;
            if (createAnggaran.type_anggaran == '0') {
                typeku = false;
            } else {
                typeku = true;
            }
            const addAnggaran = await this.prisma.anggaran.create({
                data: {
                    warga: {
                        connect: {
                            id: createAnggaran.id_warga,
                        },
                    },
                    jenis_anggaran: {
                        connect: {
                            id: createAnggaran.id_jenis_anggaran,
                        },
                    },
                    nilai: createAnggaran.nilai,
                    tanggal: isoDate,
                    keterangan: createAnggaran.keterangan,
                    type_anggaran: typeku,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah anggaran',
                result: addAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah Anggaran',
                data: error,
            };
        }
    }

    async editAnggaran(updateAnggaran: AnggaranUpdateDto) {
        try {
            const dateString = updateAnggaran.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            let typeku = true;
            if (updateAnggaran.type_anggaran == '0') {
                typeku = false;
            } else {
                typeku = true;
            }
            const ubahAnggaran = await this.prisma.anggaran.update({
                data: {
                    warga: {
                        connect: {
                            id: updateAnggaran.id_warga,
                        },
                    },
                    jenis_anggaran: {
                        connect: {
                            id: updateAnggaran.id_jenis_anggaran,
                        },
                    },
                    nilai: updateAnggaran.nilai,
                    tanggal: isoDate,
                    keterangan: updateAnggaran.keterangan,
                    type_anggaran: typeku,
                },
                where: {
                    id: updateAnggaran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil update data anggaran',
                result: ubahAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal update data Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal update data Anggaran',
                data: error,
            };
        }
    }

    async updateSetor(updateSetor: SetorUpdateDto) {
        try {
            const dateString = updateSetor.tanggal;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);

            const isoDate = date.toISOString();
            const editSetor = await this.prisma.setor.update({
                data: {
                    kk: {
                        connect: {
                            id: updateSetor.id_kk,
                        },
                    },
                    iuran: {
                        connect: {
                            id: updateSetor.id_iuran,
                        },
                    },
                    nilai: updateSetor.nilai,
                    tanggal: isoDate,
                    keterangan: updateSetor.keterangan,
                },
                where: {
                    id: updateSetor.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil update data anggaran',
                result: editSetor,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal update data setor karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal update data Setor',
                data: error,
            };
        }
    }

    async FindSetoran(idSetoran) {
        try {
            const idSetoranku = parseInt(idSetoran);

            const golekSetoranku = await this.prisma.setor.findFirst({
                select: {
                    id: true,
                    nilai: true,
                    keterangan: true,
                    kk: {
                        select: {
                            id: true,
                            no_blok: true,
                            no_rumah: true,
                            no_kk: true,
                        },
                    },
                    tanggal: true,
                    iuran: {
                        select: {
                            id: true,
                            nama: true,
                        },
                    },
                },
                where: {
                    id: idSetoranku,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data setoran',
                result: golekSetoranku,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data setor karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data Setor',
                data: error,
            };
        }
    }
    async findAnggaran(idAnggaran) {
        try {
            const idAnggaranku = parseInt(idAnggaran);
            const golekAnggaran = await this.prisma.anggaran.findFirst({
                select: {
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                            no_hp: true,
                        },
                    },
                    nilai: true,
                    tanggal: true,
                    keterangan: true,
                    type_anggaran: true,
                    jenis_anggaran: {
                        select: {
                            id: true,
                            nama: true,
                            keterangan: true,
                        },
                    },
                },
                where: {
                    id: idAnggaranku,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data anggaran',
                result: golekAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data anggaran',
                data: error,
            };
        }
    }

    async listAnggaran(laporanAnggaran: LaporanAnggaranDto) {
        try {
            const dateString_awal = laporanAnggaran.tanggal_awal;
            const date_awal = new Date(dateString_awal);
            date_awal.setHours(date_awal.getHours() + 7);

            const isoDate_awal = date_awal.toISOString();

            const dateString_akhir = laporanAnggaran.tanggal_akhir;
            const date_akhir = new Date(dateString_akhir);
            date_akhir.setHours(date_akhir.getHours() + 7);

            const isoDate_akhir = date_akhir.toISOString();
            let typeku = false;

            if (laporanAnggaran.type_anggaran == '0') {
                typeku = false;
            } else {
                typeku = true;
            }

            const LaporanAnggaran = await this.prisma.anggaran.findMany({
                select: {
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                            kk: {
                                select: {
                                    id: true,
                                    no_blok: true,
                                    no_rumah: true,
                                },
                            },
                        },
                    },
                    nilai: true,
                    id: true,
                    jenis_anggaran: {
                        select: {
                            id: true,
                            nama: true,
                        },
                    },
                    tanggal: true,
                    type_anggaran: true,
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                gte: isoDate_awal,
                                lte: isoDate_akhir,
                            },
                        },
                        {
                            type_anggaran: typeku,
                        },
                        {
                            id_jenis_anggaran: laporanAnggaran.id_jenis_anggaran,
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data anggaran',
                result: LaporanAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data anggaran',
                data: error,
            };
        }
    }
}
