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

@Injectable()
export class Bayar {
    constructor(private prisma: PrismaBayarService) {}

    async createIuran(createIuran: IuranCreateDto) {
        try {
            const addIuran = await this.prisma.iuran.create({
                data: {
                    iuran: createIuran.iuran,
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

    async listSetoran() {
        try {
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
                            iuran: true,
                            keterangan: true,
                        },
                    },
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
                    jenis_biaya: createBiaya.jenis_biaya,
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
                    jenis_biaya: createBiaya.jenis_biaya,
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
}
