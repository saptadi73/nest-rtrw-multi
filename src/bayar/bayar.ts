import { Injectable } from '@nestjs/common';
import { PrismaBayarService } from './prisma.bayar.service';
import { IuranCreateDto } from './dto/iuran.create.dto';
import { Prisma } from '@prisma/client';
import { SetorCreateDto } from './dto/setor.create.dto';
import { SetorUpdateDto } from './dto/setor.update.dto';
import { IuranUpdateDto } from './dto/iuran.update.dto';
import { HitungHutangDto } from './dto/hitung.hutang.dto';
import { JenisAnggaranCreateDto } from './dto/jenis.anggaran.create.dto';
import { AnggaranCreateDto } from './dto/anggaran.create.dto';
import { AnggaranUpdateDto } from './dto/anggaran.update.dto';
import { LaporanSetoranDto } from './dto/laporan.setoran.dto';
import { LaporanAnggaranDto } from './dto/laporan.anggaran.dto';
import { v4 as uuidv4 } from 'uuid';
import { TypeAnggaranCreateDto } from './dto/type.anggaran.create.dto';

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
                    uuid: uuidv4(),
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
                    uuid: uuidv4(),
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
                    nama: createIuran.nama,
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

    async deleteIuran(createIuran: IuranUpdateDto) {
        try {
            const addIuran = await this.prisma.iuran.delete({
                where: {
                    id: createIuran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil hapus jenis iuran',
                result: addIuran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal hapus jenis iuran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal hapus jenis iuran', data: error };
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

    async findJenisIuran(iuranUpdate: IuranUpdateDto) {
        try {
            const cariJenisIuran = await this.prisma.iuran.findFirst({
                where: {
                    id: iuranUpdate.id,
                },
                select: {
                    id: true,
                    uuid: true,
                    iuran: true,
                    nama: true,
                    keterangan: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data iuran',
                result: cariJenisIuran,
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
            console.log(laporanTanggal);
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
                            blok: {
                                select: {
                                    id: true,
                                    blok: true,
                                },
                            },
                            no_rumah: true,
                            warga: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                                where: {
                                    type: {
                                        id: 1,
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

    async listSetoranKK(id: string) {
        try {
            const listSetoran = await this.prisma.setor.findMany({
                select: {
                    id: true,
                    kk: {
                        select: {
                            id: true,
                            blok: {
                                select: {
                                    id: true,
                                    blok: true,
                                },
                            },
                            no_rumah: true,
                            warga: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                                where: {
                                    type: {
                                        id: 1,
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
                            nama: true,
                        },
                    },
                },
                where: {
                    kk: {
                        id: parseInt(id),
                    },
                },
                orderBy: {
                    tanggal: 'desc',
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

    async listSudahBayar(hutang: HitungHutangDto) {
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
                            warga: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                                where: {
                                    type: {
                                        id: 1,
                                    },
                                },
                            },
                            blok: {
                                select: {
                                    blok: true,
                                },
                            },
                            no_rumah: true,
                        },
                    },
                    tanggal: true,
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lt: endDate,
                            },
                        },
                        {
                            id_iuran: hutang.iuran,
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data warga bayar',
                result: wargaBayarBulan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal berhasil dapat data warga bayar karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat berhasil dapat data warga bayar',
                data: error,
            };
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
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lt: endDate,
                            },
                        },
                        {
                            id_iuran: hutang.iuran,
                        },
                    ],
                },
            });

            const listIDBayar = wargaBayarBulan.map((setor) => setor.kk.id);

            const WargaGakBayar = await this.prisma.kk.findMany({
                select: {
                    id: true,
                    blok: {
                        select: {
                            id: true,
                            blok: true,
                        },
                    },
                    no_rumah: true,
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                        },
                        where: {
                            type: {
                                id: 1,
                            },
                        },
                    },
                },
                where: {
                    id: {
                        notIn: listIDBayar,
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

    async listBelumBayarIuran() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

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
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lt: endDate,
                            },
                        },
                        {
                            id_iuran: 1,
                        },
                    ],
                },
            });

            const listIDBayar = wargaBayarBulan.map((setor) => setor.kk.id);

            const WargaGakBayar = await this.prisma.kk.findMany({
                select: {
                    id: true,
                    blok: {
                        select: {
                            id: true,
                            blok: true,
                        },
                    },
                    no_rumah: true,
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                        },
                        where: {
                            type: {
                                id: 1,
                            },
                        },
                    },
                },
                where: {
                    id: {
                        notIn: listIDBayar,
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
                    uuid: uuidv4(),
                    type_anggaran: {
                        connect: {
                            id: createJenisAnggaran.id_type_anggaran,
                        },
                    },
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

    async findJenisAnggaran(updateJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            const cariJenisAnggaran = await this.prisma.jenis_anggaran.findFirst({
                where: {
                    id: updateJenisAnggaran.id,
                },
                select: {
                    id: true,
                    nama: true,
                    keterangan: true,
                    uuid: true,
                    type_anggaran: {
                        select: {
                            id: true,
                            type: true,
                        },
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil ubah data jenis Anggaran',
                result: cariJenisAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal ubah data jenis anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal ubah data jenis anggaran',
                data: error,
            };
        }
    }

    async updateJenisAnggaran(updateJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            const editJenisAnggaran = await this.prisma.jenis_anggaran.update({
                data: {
                    nama: updateJenisAnggaran.nama,
                    keterangan: updateJenisAnggaran.keterangan,
                    type_anggaran: {
                        connect: {
                            id: updateJenisAnggaran.id_type_anggaran,
                        },
                    },
                },
                where: {
                    id: updateJenisAnggaran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil menambah Jenis Anggaran',
                result: editJenisAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal ubah jenis Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal ubah Jenis Anggaran',
                data: error,
            };
        }
    }

    async deleteJenisAnggaran(updateJenisAnggaran: JenisAnggaranCreateDto) {
        try {
            const editJenisAnggaran = await this.prisma.jenis_anggaran.delete({
                where: {
                    id: updateJenisAnggaran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil hapus Jenis Anggaran',
                result: editJenisAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal hapus jenis Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal hapus Jenis Anggaran',
                data: error,
            };
        }
    }

    async listTypeAnggaran() {
        try {
            const typeAnggaran = await this.prisma.type_anggaran.findMany({
                select: {
                    id: true,
                    type: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data type Anggaran',
                result: typeAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data type anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data type anggaran',
                data: error,
            };
        }
    }

    async listJenisAnggaran(jenisAnggaran: JenisAnggaranCreateDto) {
        try {
            const DaftarJenisAnggaran = await this.prisma.jenis_anggaran.findMany({
                select: {
                    id: true,
                    nama: true,
                    keterangan: true,
                },
                where: {
                    id_type_anggaran: jenisAnggaran.id_type_anggaran,
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
                    type_anggaran: {
                        connect: {
                            id: createAnggaran.id_type_anggaran,
                        },
                    },
                    uuid: uuidv4(),
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
                    type_anggaran: {
                        connect: {
                            id: updateAnggaran.id_type_anggaran,
                        },
                    },
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

    async deleteSetorAnggaran(anggaranSetor: SetorUpdateDto) {
        try {
            const hapusAnggaran = await this.prisma.anggaran.delete({
                where: {
                    id: anggaranSetor.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil update data anggaran',
                result: hapusAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal hapus data Anggaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal hapus data Anggaran',
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

    async deleteSetoran(setoran: SetorUpdateDto) {
        try {
            const hapusSetor = await this.prisma.setor.delete({
                where: {
                    id: setoran.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil hapus data setoran',
                result: hapusSetor,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal hapus data setoran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal hapus data Setoran, Maaf Sekali',
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
                            blok: {
                                select: {
                                    id: true,
                                    blok: true,
                                },
                            },
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
                    bukti: {
                        select: {
                            id: true,
                            nama: true,
                            url: true,
                            keterangan: true,
                        },
                    },
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

    async findAnggaranWarga(idAnggaran) {
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
                    id_warga: idAnggaranku,
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
            let date_awal: Date;
            let date_akhir: Date;

            // Initialize both dates
            if (!laporanAnggaran.tanggal_awal || laporanAnggaran.tanggal_awal.trim() === '') {
                date_awal = new Date();
                date_awal.setDate(date_awal.getDate() - 7);
            } else {
                date_awal = new Date(laporanAnggaran.tanggal_awal);
            }

            if (!laporanAnggaran.tanggal_akhir || laporanAnggaran.tanggal_akhir.trim() === '') {
                date_akhir = new Date();
            } else {
                date_akhir = new Date(laporanAnggaran.tanggal_akhir);
            }

            // If both dates are today, set date_awal to 7 days ago
            const today = new Date();
            if (
                date_awal.toDateString() === today.toDateString() &&
                date_akhir.toDateString() === today.toDateString()
            ) {
                date_awal.setDate(date_awal.getDate() - 7);
            }

            // Adjust for timezone
            date_awal.setHours(date_awal.getHours() + 7);
            date_akhir.setHours(date_akhir.getHours() + 7);

            const isoDate_awal = date_awal.toISOString();
            const isoDate_akhir = date_akhir.toISOString();

            // Build where conditions
            const whereConditions: any[] = [
                {
                    tanggal: {
                        gte: isoDate_awal,
                        lte: isoDate_akhir,
                    },
                },
            ];

            // Add type anggaran condition if not 0
            if (laporanAnggaran.id_type_anggaran !== 0) {
                whereConditions.push({
                    id_type_anggaran: laporanAnggaran.id_type_anggaran,
                });
            }

            // Add jenis anggaran condition if not 0
            if (laporanAnggaran.id_jenis_anggaran !== 0) {
                whereConditions.push({
                    id_jenis_anggaran: laporanAnggaran.id_jenis_anggaran,
                });
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
                                    blok: {
                                        select: {
                                            id: true,
                                            blok: true,
                                        },
                                    },
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
                    bukti: {
                        select: {
                            id: true,
                            url: true,
                            nama: true,
                        },
                    },
                },
                where: {
                    AND: whereConditions,
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

    async jumlahIuranBulanan() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

            const startDate = new Date(year, month, 1); // September 1, 2023
            const endDate = new Date(year, month + 1, 1);

            const jumlahiuran = await this.prisma.setor.aggregate({
                _sum: {
                    nilai: true,
                },
                where: {
                    tanggal: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data iuran',
                data: jumlahiuran,
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
            return {
                status: 'nok',
                message: 'gagal dapat data iuran',
                data: error,
            };
        }
    }

    async jumlahAnggaranMasuk() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

            const startDate = new Date(year, month, 1); // September 1, 2023
            const endDate = new Date(year, month + 1, 1);

            const jmlAngInc = await this.prisma.anggaran.aggregate({
                _sum: {
                    nilai: true,
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        {
                            type_anggaran: {
                                id: 1,
                            },
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data pemasukan',
                data: jmlAngInc,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data pemasukan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pemasukan',
                data: error,
            };
        }
    }

    async jumlahAnggaranKeluar() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

            const startDate = new Date(year, month, 1); // September 1, 2023
            const endDate = new Date(year, month + 1, 1);

            const jmlAngInc = await this.prisma.anggaran.aggregate({
                _sum: {
                    nilai: true,
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        {
                            type_anggaran: {
                                id: 2,
                            },
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data pengeluaran',
                data: jmlAngInc,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pengeluaran',
                data: error,
            };
        }
    }

    async jmlWargaIuran() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

            const startDate = new Date(year, month, 1); // September 1, 2023
            const endDate = new Date(year, month + 1, 1);

            const jmlIuran = await this.prisma.setor.aggregate({
                _count: {
                    id_kk: true,
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        {
                            id_iuran: 1,
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah iuran',
                data: jmlIuran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data jumlah iuran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data jumlah iuran',
                data: error,
            };
        }
    }

    async listSetor() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

            const startDate = new Date(year, month, 1); // September 1, 2023
            const endDate = new Date(year, month + 1, 1);

            const daftarSetor = await this.prisma.setor.findMany({
                select: {
                    kk: {
                        select: {
                            id: true,
                            blok: {
                                select: {
                                    id: true,
                                    blok: true,
                                },
                            },
                            no_rumah: true,
                            warga: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                            },
                        },
                    },
                    nilai: true,
                    tanggal: true,
                },
                where: {
                    tanggal: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah warga iuran',
                data: daftarSetor,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data jumlah warga iuran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data jumlah warga iuran',
                data: error,
            };
        }
    }

    async listWargaIuran() {
        try {
            const tanggal = new Date();
            const month = tanggal.getMonth(); // September
            const year = tanggal.getFullYear();

            const startDate = new Date(year, month, 1); // September 1, 2023
            const endDate = new Date(year, month + 1, 1);
            const listIuranAll = await this.prisma.setor.findMany({
                select: {
                    id: true,
                    kk: {
                        select: {
                            id: true,
                            blok: {
                                select: {
                                    id: true,
                                    blok: true,
                                },
                            },
                            no_rumah: true,
                            warga: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                                where: {
                                    type: {
                                        id: 1,
                                    },
                                },
                            },
                        },
                    },
                    nilai: true,
                    tanggal: true,
                    iuran: {
                        select: {
                            nama: true,
                        },
                    },
                },
                where: {
                    AND: [
                        {
                            tanggal: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        {
                            id_iuran: 1,
                        },
                    ],
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data daftar warga iuran',
                data: listIuranAll,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data daftar warga iuran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data daftar warga iuran',
                data: error,
            };
        }
    }

    async listAllPemasukan() {
        try {
            const daftarAllPemasukan = await this.prisma.anggaran.findMany({
                select: {
                    warga: {
                        select: {
                            nama: true,
                        },
                    },
                    nilai: true,
                    jenis_anggaran: {
                        select: {
                            id: true,
                            nama: true,
                        },
                    },
                    tanggal: true,
                },
                where: {
                    type_anggaran: {
                        id: 1,
                    },
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah pemasukan',
                data: daftarAllPemasukan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data pemasukan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pemasukan warga iuran',
                data: error,
            };
        }
    }

    async listAllPengeluaran() {
        try {
            const daftarAllPengeluaran = await this.prisma.anggaran.findMany({
                select: {
                    warga: {
                        select: {
                            nama: true,
                        },
                    },
                    nilai: true,
                    jenis_anggaran: {
                        select: {
                            id: true,
                            nama: true,
                        },
                    },
                    tanggal: true,
                },
                where: {
                    type_anggaran: {
                        id: 2,
                    },
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah pemasukan',
                data: daftarAllPengeluaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data pemasukan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pemasukan warga iuran',
                data: error,
            };
        }
    }

    async iuranBulan() {
        try {
            const iuranBulanan = await this.prisma
                .$queryRaw`SELECT SUM(nilai)::int AS jumlah, EXTRACT(MONTH FROM tanggal) AS bulan FROM setor WHERE EXTRACT(YEAR FROM tanggal) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM tanggal) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY EXTRACT(MONTH FROM tanggal)`;
            return {
                status: 'ok',
                message: 'berhasil dapat data iuran',
                data: iuranBulanan,
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
            return {
                status: 'nok',
                message: 'gagal dapat data iuran',
                data: error,
            };
        }
    }

    async pemasukanBulan() {
        try {
            const iuranBulanan = await this.prisma
                .$queryRaw`SELECT SUM(nilai)::int AS jumlah, EXTRACT(MONTH FROM tanggal) AS bulan FROM anggaran WHERE id_type_anggaran = 1 AND EXTRACT(YEAR FROM tanggal) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM tanggal) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY EXTRACT(MONTH FROM tanggal)`;
            return {
                status: 'ok',
                message: 'berhasil dapat data bulanan pemasukan anggaran',
                data: iuranBulanan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data bulanan pemasukan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pemasukan',
                data: error,
            };
        }
    }

    async pengeluaranBulan() {
        try {
            // const tanggal = new Date();
            // const tahun = tanggal.getFullYear();
            const iuranBulanan = await this.prisma
                .$queryRaw`SELECT SUM(nilai)::int AS jumlah, EXTRACT(MONTH FROM tanggal) AS bulan FROM anggaran WHERE id_type_anggaran = 2 AND EXTRACT(YEAR FROM tanggal) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM tanggal) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY EXTRACT(MONTH FROM tanggal);`;
            return {
                status: 'ok',
                message: 'berhasil dapat data bulanan pengeluaran anggaran',
                data: iuranBulanan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data bulanan pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pengeluaran',
                data: error,
            };
        }
    }

    async createTypeAnggaran(createTypeAnggaran: TypeAnggaranCreateDto) {
        try {
            const TypeAnggaran = await this.prisma.type_anggaran.create({
                data: {
                    type: createTypeAnggaran.type,
                    uuid: uuidv4(),
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah type anggaran',
                data: TypeAnggaran,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data bulanan pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pengeluaran',
                data: error,
            };
        }
    }

    async totalKabeh() {
        try {
            const totalIuranKabeh = await this.prisma
                .$queryRaw`select sum(s.nilai)::bigint as iuran from setor s`;
            const totalMasukKabeh = await this.prisma
                .$queryRaw`select sum(a.nilai)::bigint as masuk from anggaran a where a.id_type_anggaran = 1`;
            const totalKeluarKabeh = await this.prisma
                .$queryRaw`select sum(a.nilai)::bigint as keluar from anggaran a where a.id_type_anggaran = 2`;
            return {
                status: 'ok',
                message: 'berhasil dapat data total data keuangan',
                totalIuranKabeh: totalIuranKabeh[0].iuran?.toString() ?? '0',
                totalMasukKabeh: totalMasukKabeh[0].masuk?.toString() ?? '0',
                totalKeluarKabeh: totalKeluarKabeh[0].keluar?.toString() ?? '0',
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data total keuangan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data keuangan',
                data: error,
            };
        }
    }

    async totalIuranBulanan() {
        try {
            // return {
            //     status: 'ok',
            //     message: 'berhasil dapat data total iuran bulanan',
            //     result: 'hehehe',
            // };
            const bulanIuran = await this.prisma.$queryRawUnsafe<
                { bulan: Date; total: bigint | null }[]
            >(
                `WITH months AS ( SELECT generate_series(DATE_TRUNC('month', (SELECT MIN(tanggal) FROM setor WHERE tanggal IS NOT NULL)), DATE_TRUNC('month', (SELECT MAX(tanggal) FROM setor WHERE tanggal IS NOT NULL)), interval '1 month') AS bulan) SELECT m.bulan, SUM(s.nilai)::bigint AS total FROM months m LEFT JOIN setor s ON DATE_TRUNC('month', s.tanggal) = m.bulan GROUP BY m.bulan ORDER BY m.bulan ASC`
            );
            const mapped = bulanIuran.map((row) => ({
                bulan: row.bulan.toISOString().substring(0, 7), // YYYY-MM
                total: row.total ? row.total.toString() : 0, // or use Number(row.total) if safe
            }));

            return {
                status: 'ok',
                message: 'berhasil dapat data total iuran bulanan',
                result: mapped,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data total keuangan bulanan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data keuangan bulanan',
                data: error,
            };
        }
    }

    async totalMasukBulanan() {
        try {
            // return {
            //     status: 'ok',
            //     message: 'berhasil dapat data total iuran bulanan',
            //     result: 'hehehe',
            // };
            const bulanIuran = await this.prisma.$queryRawUnsafe<
                { bulan: Date; total: bigint | null }[]
            >(
                `WITH months AS (SELECT generate_series(DATE_TRUNC('month', (SELECT MIN(tanggal) FROM anggaran)),DATE_TRUNC('month',(SELECT MAX(tanggal) FROM anggaran)),interval '1 month') AS bulan) SELECT m.bulan, SUM(a.nilai)::bigint AS total FROM months m LEFT JOIN anggaran a ON DATE_TRUNC('month', a.tanggal) = m.bulan AND a.id_type_anggaran = 1 GROUP BY m.bulan ORDER BY m.bulan ASC`
            );
            const mapped = bulanIuran.map((row) => ({
                bulan: row.bulan.toISOString().substring(0, 7), // YYYY-MM
                total: row.total ? row.total.toString() : 0, // or use Number(row.total) if safe
            }));

            return {
                status: 'ok',
                message: 'berhasil dapat data total iuran bulanan',
                result: mapped,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data total keuangan bulanan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data keuangan bulanan',
                data: error,
            };
        }
    }

    async totalKeluarBulanan() {
        try {
            // return {
            //     status: 'ok',
            //     message: 'berhasil dapat data total iuran bulanan',
            //     result: 'hehehe',
            // };
            const bulanIuran = await this.prisma.$queryRawUnsafe<
                { bulan: Date; total: bigint | null }[]
            >(
                `WITH months AS (SELECT generate_series(DATE_TRUNC('month', (SELECT MIN(tanggal) FROM anggaran WHERE id_type_anggaran = 2 AND tanggal IS NOT NULL)),DATE_TRUNC('month', (SELECT MAX(tanggal) FROM anggaran WHERE id_type_anggaran = 2 AND tanggal IS NOT NULL)),interval '1 month') AS bulan) SELECT m.bulan, SUM(a.nilai)::bigint AS total FROM months m LEFT JOIN anggaran a ON DATE_TRUNC('month', a.tanggal) = m.bulan AND a.id_type_anggaran = 2 GROUP BY m.bulan ORDER BY m.bulan ASC`
            );
            const mapped = bulanIuran.map((row) => ({
                bulan: row.bulan.toISOString().substring(0, 7), // YYYY-MM
                total: row.total ? row.total.toString() : 0, // or use Number(row.total) if safe
            }));

            return {
                status: 'ok',
                message: 'berhasil dapat data total iuran bulanan',
                result: mapped,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data total keuangan bulanan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data keuangan bulanan',
                data: error,
            };
        }
    }

    async groupPengeluaran() {
        try {
            const bulanIuran = await this.prisma.$queryRaw<
                { nama: string; total: bigint }[]
            >`select sum(a.nilai)::bigint as total, ja.nama as nama from anggaran a,jenis_anggaran ja  where a.id_type_anggaran = 2 and a.id_jenis_anggaran = ja.id group by ja.nama`;
            const mapped = bulanIuran.map((row) => ({
                nama: row.nama, // YYYY-MM
                total: row.total.toString(), // or use Number(row.total) if safe
            }));

            return {
                status: 'ok',
                message: 'berhasil dapat data total iuran bulanan',
                result: mapped,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data total pengeluaran karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pengeluaran',
                data: error,
            };
        }
    }
}
