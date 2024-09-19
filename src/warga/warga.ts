import { Injectable } from '@nestjs/common';
import { PrismaWargaService } from './prisma.warga.service';
import { KkCreateDto } from './dto/kk.create.dto';
import { Prisma } from '@prisma/client';
import { KkUpdateDto } from './dto/kk.update.dto';
import { WargaCreateDto } from './dto/warga.create.dto';
import { WargaUpdateDto } from './dto/warga.update.dto';
import { TypeCreateDto } from './dto/type.create.dto';
import { TypeUpdateDto } from './dto/type.update.dto';
import { CreateFileDto } from './dto/create.file.dto';

@Injectable()
export class Warga {
    constructor(private prisma: PrismaWargaService) {}

    async createKK(createKK: KkCreateDto) {
        try {
            const addWarga = await this.prisma.kk.create({
                data: {
                    no_kk: createKK.no_kk,
                    no_blok: createKK.no_blok,
                    no_rumah: createKK.no_rumah,
                },
            });
            return { status: 'ok', message: 'berhasil tambah data kk', result: addWarga };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah data kk karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah data kk', data: error };
        }
    }

    async updateKK(updateKk: KkUpdateDto) {
        try {
            const editKK = await this.prisma.kk.update({
                where: {
                    id: updateKk.id,
                },
                data: {
                    no_kk: updateKk.no_kk,
                    no_blok: updateKk.no_blok,
                    no_rumah: updateKk.no_rumah,
                },
            });
            return { status: 'ok', message: 'berhasil update data kk', result: editKK };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal update data kk karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal update data kk', data: error };
        }
    }

    async createWarga(createWarga: WargaCreateDto) {
        try {
            const dateString = createWarga.tanggal_lahir;
            const date = new Date(dateString);
            const isoDate = date.toISOString();
            let jk = true;
            if (createWarga.jenis_kelamin == '0') {
                jk = false;
            } else {
                jk = true;
            }
            const addWarga = await this.prisma.warga.create({
                data: {
                    nama: createWarga.nama,
                    no_hp: createWarga.no_hp,
                    nik: createWarga.nik,
                    tempat_lahir: createWarga.tempat_lahir,
                    tanggal_lahir: isoDate,
                    jenis_kelamin: jk,
                    type: {
                        connect: {
                            id: createWarga.id_type,
                        },
                    },
                    kk: {
                        connect: {
                            id: createWarga.id_kk,
                        },
                    },
                },
            });
            return { status: 'ok', message: 'berhasil tambah data warga', result: addWarga };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah data warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah data warga', data: error };
        }
    }

    async updateWarga(createWarga: WargaUpdateDto) {
        try {
            const dateString = createWarga.tanggal_lahir;
            const date = new Date(dateString);
            const isoDate = date.toISOString();
            const addWarga = await this.prisma.warga.update({
                data: {
                    nama: createWarga.nama,
                    no_hp: createWarga.no_hp,
                    nik: createWarga.nik,
                    tempat_lahir: createWarga.tempat_lahir,
                    tanggal_lahir: isoDate,
                    jenis_kelamin: createWarga.jenis_kelamin,
                    type: {
                        connectOrCreate: {
                            where: {
                                id: createWarga.id_kk,
                            },
                            create: {
                                nama: createWarga.nama_type,
                            },
                        },
                    },
                },
                where: {
                    id: createWarga.id,
                },
            });
            return { status: 'ok', message: 'berhasil update data warga', result: addWarga };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal update data warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal update data warga', data: error };
        }
    }

    async createType(createType: TypeCreateDto) {
        try {
            const addType = await this.prisma.type.create({
                data: {
                    nama: createType.nama,
                },
            });
            return { status: 'ok', message: 'berhasil tambah data type warga', result: addType };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah data type warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah data type warga', data: error };
        }
    }

    async updateType(createType: TypeUpdateDto) {
        try {
            const addType = await this.prisma.type.update({
                data: {
                    nama: createType.nama,
                },
                where: {
                    id: createType.id,
                },
            });
            return { status: 'ok', message: 'berhasil update data type warga', result: addType };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal update data type warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal update data type warga', data: error };
        }
    }

    async listIdKk() {
        try {
            const daftarKk = await this.prisma.kk.findMany({
                select: {
                    id: true,
                    no_kk: true,
                    no_blok: true,
                    no_rumah: true,
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                            no_hp: true,
                            type: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                            },
                        },
                        where: {
                            type: {
                                id: 1,
                            },
                        },
                    },
                },
                orderBy: {
                    no_blok: 'asc',
                    no_rumah: 'asc',
                },
            });
            return { status: 'ok', message: 'berhasil dapat data KK', result: daftarKk };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal update data type warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal update data type warga', data: error };
        }
    }

    async listWargaPerKK(idKK) {
        try {
            const idKKku = parseInt(idKK);
            const listWargaKK = await this.prisma.warga.findMany({
                select: {
                    id: true,
                    nama: true,
                    tempat_lahir: true,
                    tanggal_lahir: true,
                    no_hp: true,
                    nik: true,
                    type: {
                        select: {
                            nama: true,
                        },
                    },
                    kk: {
                        select: {
                            no_blok: true,
                            no_rumah: true,
                        },
                    },
                },
                where: {
                    kk: {
                        id: idKKku,
                    },
                },
                orderBy: {
                    type: {
                        id: 'asc',
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data warga per KK',
                result: listWargaKK,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data warga per KK karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data warga per KK', data: error };
        }
    }

    async listAllWarga() {
        try {
            const listWarga = await this.prisma.warga.findMany({
                select: {
                    id: true,
                    nama: true,
                    tempat_lahir: true,
                    tanggal_lahir: true,
                    no_hp: true,
                    nik: true,
                    type: {
                        select: {
                            nama: true,
                        },
                    },
                    kk: {
                        select: {
                            id: true,
                            no_blok: true,
                            no_rumah: true,
                            no_kk: true,
                        },
                    },
                },
                orderBy: {
                    kk: {
                        no_blok: 'asc',
                        no_rumah: 'asc',
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data warga',
                result: listWarga,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data warga', data: error };
        }
    }

    async listType() {
        try {
            const listType = await this.prisma.type.findMany({
                select: {
                    id: true,
                    nama: true,
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat type warga',
                result: listType,
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

    async photoUpload(uploadfile: CreateFileDto, fileku) {
        try {
            const uploadPhoto = await this.prisma.photo.create({
                data: {
                    nama: uploadfile.nama,
                    keterangan: uploadfile.keterangan,
                    url: fileku.filename,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil upload photo',
                result: uploadPhoto,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal upload photo karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal upload photo', data: error };
        }
    }

    async listKK() {
        try {
            const listKKsemua = await this.prisma.kk.findMany({
                select: {
                    no_blok: true,
                    no_rumah: true,
                    no_kk: true,
                    id: true,
                    warga: {
                        where: {
                            id_type: 1,
                        },
                        select: {
                            nama: true,
                        },
                    },
                },
                orderBy: [
                    {
                        no_blok: 'asc',
                    },
                    {
                        no_rumah: 'asc',
                    },
                ],
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data KK',
                result: listKKsemua,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data Keluarga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data Keluarga', data: error };
        }
    }
}
