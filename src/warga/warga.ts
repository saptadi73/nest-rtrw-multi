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
import { CreateFileKeluargaDto } from './dto/create.file.keluarga.dto';
import { v4 as uuidv4 } from 'uuid';
import { BlokCreateDto } from './dto/blok.create.dto';
import { CreateFileUserDto } from './dto/create.file.user.dto';
import { CreateGpsLocationDto } from './dto/create.gps.location.dto';
import { PekerjaanWargaDto } from './dto/pekerjaan.warga.dto';
import { StatusWargaDto } from './dto/status.warga.dto';

@Injectable()
export class Warga {
    constructor(private prisma: PrismaWargaService) {}

    async createBlok(createBlok: BlokCreateDto) {
        try {
            const tambahBlok = await this.prisma.blok.create({
                data: {
                    uuid: uuidv4(),
                    blok: createBlok.blok,
                },
            });
            return { status: 'ok', message: 'berhasil tambah data blok', result: tambahBlok };
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

    async editBlok(createBlok: BlokCreateDto) {
        try {
            const tambahBlok = await this.prisma.blok.update({
                data: {
                    blok: createBlok.blok,
                },
                where: {
                    id: createBlok.id,
                },
            });
            return { status: 'ok', message: 'berhasil edit data blok', result: tambahBlok };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal edit data kk karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal edit kk', data: error };
        }
    }

    async listBlok() {
        try {
            const daftarBlok = await this.prisma.blok.findMany({
                select: {
                    id: true,
                    blok: true,
                },
            });
            return { status: 'ok', message: 'berhasil ambil data blok', result: daftarBlok };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data blok karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data blok', data: error };
        }
    }

    async findBlok(id: string) {
        try {
            const idku = parseInt(id);
            const daftarBlok = await this.prisma.blok.findFirst({
                select: {
                    id: true,
                    blok: true,
                },
                where: {
                    id: idku,
                },
            });
            return { status: 'ok', message: 'berhasil ambil data blok', result: daftarBlok };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data blok karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data blok', data: error };
        }
    }

    async createKK(createKK: KkCreateDto) {
        try {
            const dateString = createKK.tanggal_lahir;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);
            const isoDate = date.toISOString();
            let jk = true;
            if (createKK.jenis_kelamin == '0') {
                jk = false;
            } else {
                jk = true;
            }
            const addWarga = await this.prisma.kk.create({
                data: {
                    no_kk: createKK.no_kk,
                    no_rumah: createKK.no_rumah,
                    uuid: uuidv4(),
                    blok: {
                        connect: {
                            id: createKK.id_blok,
                        },
                    },
                    warga: {
                        create: {
                            nama: createKK.nama,
                            nik: createKK.nik,
                            uuid: uuidv4(),
                            tempat_lahir: createKK.tempat_lahir,
                            tanggal_lahir: isoDate,
                            jenis_kelamin: jk,
                            type: {
                                connect: {
                                    id: 1,
                                },
                            },
                            status_warga: {
                                connect: {
                                    id: createKK.id_status_warga,
                                },
                            },
                            pekerjaan: {
                                connect: {
                                    id: createKK.id_pekerjaan,
                                },
                            },
                        },
                    },
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

    async updateKK(id: string, updateKk: KkUpdateDto) {
        try {
            const idku = parseInt(id);
            const editKK = await this.prisma.kk.update({
                where: {
                    id: idku,
                },
                data: {
                    no_kk: updateKk.no_kk,
                    blok: {
                        connect: {
                            id: updateKk.id_blok,
                        },
                    },
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

    async findKK(idkk: string) {
        try {
            const idkkku = idkk;
            const CariKK = await this.prisma.kk.findFirst({
                select: {
                    id: true,
                    blok: true,
                    no_kk: true,
                    no_rumah: true,
                    warga: {
                        select: {
                            id: true,
                            nama: true,
                        },
                        where: {
                            id_type: 1,
                        },
                    },
                },
                where: {
                    uuid: idkkku,
                },
            });
            return { status: 'ok', message: 'berhasil dapat data kk', result: CariKK };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data kk karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data kk', data: error };
        }
    }

    async createWarga(createWarga: WargaCreateDto) {
        try {
            const dateString = createWarga.tanggal_lahir;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);
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
                    status_warga: {
                        connect: {
                            id: createWarga.id_status_warga,
                        },
                    },
                    pekerjaan: {
                        connect: {
                            id: createWarga.id_pekerjaan,
                        },
                    },
                    uuid: uuidv4(),
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

    async updateWarga(id: string, createWarga: WargaUpdateDto) {
        try {
            const idku = parseInt(id);
            const dateString = createWarga.tanggal_lahir;
            const date = new Date(dateString);
            date.setHours(date.getHours() + 7);
            const isoDate = date.toISOString();
            let jk = true;
            if (createWarga.jenis_kelamin == '0') {
                jk = false;
            } else {
                jk = true;
            }
            console.log(isoDate);
            const addWarga = await this.prisma.warga.update({
                data: {
                    nama: createWarga.nama,
                    no_hp: createWarga.no_hp,
                    nik: createWarga.nik,
                    tempat_lahir: createWarga.tempat_lahir,
                    tanggal_lahir: isoDate,
                    jenis_kelamin: jk,
                    kk: {
                        connect: {
                            id: createWarga.id_kk,
                        },
                    },
                    type: {
                        connect: {
                            id: createWarga.id_type,
                        },
                    },
                    status_warga: {
                        connect: {
                            id: createWarga.id_status_warga,
                        },
                    },
                    pekerjaan: {
                        connect: {
                            id: createWarga.id_pekerjaan,
                        },
                    },
                },
                where: {
                    id: idku,
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

    async findWarga(idWarga: string) {
        try {
            const idwargaku = idWarga;
            const cariWarga = await this.prisma.warga.findFirst({
                select: {
                    id: true,
                    nama: true,
                    nik: true,
                    id_type: true,
                    no_hp: true,
                    tempat_lahir: true,
                    tanggal_lahir: true,
                    jenis_kelamin: true,
                    id_kk: true,
                    id_pekerjaan: true,
                    id_status_warga: true,
                    kk: {
                        select: {
                            id: true,
                            no_rumah: true,
                            blok: {
                                select: {
                                    blok: true,
                                    id: true,
                                },
                            },
                        },
                    },
                },
                where: {
                    uuid: idwargaku,
                },
            });
            return { status: 'ok', message: 'berhasil cari data warga', result: cariWarga };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal cari data warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal cari data warga', data: error };
        }
    }

    async createType(createType: TypeCreateDto) {
        try {
            const addType = await this.prisma.type.create({
                data: {
                    nama: createType.nama,
                    uuid: uuidv4(),
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

    async findType(id: string) {
        try {
            const cariType = await this.prisma.type.findFirst({
                select: {
                    id: true,
                    nama: true,
                },
                where: {
                    id: parseInt(id),
                },
            });
            return { status: 'ok', message: 'berhasil dapat data type warga', result: cariType };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal data data type warga karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data type warga', data: error };
        }
    }

    async listIdKk() {
        try {
            const daftarKk = await this.prisma.kk.findMany({
                select: {
                    id: true,
                    no_kk: true,
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
                            no_hp: true,
                            tanggal_lahir: true,
                            tempat_lahir: true,
                            nik: true,
                            jenis_kelamin: true,
                            pekerjaan: {
                                select: {
                                    nama: true,
                                },
                            },
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
                    blok: {
                        id: 'asc',
                    },
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
                    kk: {
                        select: {
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
                orderBy: {
                    kk: {
                        blok: {
                            id: 'asc',
                        },
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
            return { status: 'nok', message: 'gagal dapat data warganya, maaf', data: error };
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

    async photoUploadWarga(uploadfile: CreateFileDto, fileku) {
        try {
            const uploadPhoto = await this.prisma.photo_warga.create({
                data: {
                    nama: uploadfile.nama,
                    keterangan: uploadfile.keterangan,
                    url: fileku.filename,
                    id_warga: parseInt(uploadfile.id_warga),
                    uuid: uuidv4(),
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

    async photoUploadUser(uploadfile: CreateFileUserDto, fileku) {
        try {
            const uploadPhoto = await this.prisma.photo_user.create({
                data: {
                    nama: uploadfile.nama,
                    keterangan: uploadfile.keterangan,
                    url: fileku.filename,
                    id_user: parseInt(uploadfile.id_user),
                    uuid: uuidv4(),
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

    async UploadKK(uploadKK: CreateFileKeluargaDto, fileku) {
        try {
            const fileKK = await this.prisma.filekeluarga.create({
                data: {
                    nama: uploadKK.nama,
                    keterangan: uploadKK.keterangan,
                    id_kk: parseInt(uploadKK.id_kk),
                    url: fileku.filename,
                    uuid: uuidv4(),
                },
            });
            return {
                status: 'ok',
                message: 'berhasil upload photo',
                result: fileKK,
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
                    blok: {
                        select: {
                            id: true,
                            blok: true,
                        },
                    },
                    no_rumah: true,
                    no_kk: true,
                    id: true,
                    uuid: true,
                    warga: {
                        where: {
                            id_type: 1,
                        },
                        select: {
                            nama: true,
                            tempat_lahir: true,
                            tanggal_lahir: true,
                            no_hp: true,
                            nik: true,
                            jenis_kelamin: true,
                            uuid: true,
                            pekerjaan: {
                                select: {
                                    id: true,
                                    nama: true,
                                },
                            },
                            status_warga: {
                                select: {
                                    status: true,
                                },
                            },
                        },
                    },
                },
                orderBy: [
                    {
                        blok: {
                            id: 'asc',
                        },
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

    async jumlahKK() {
        try {
            const jumlahSemuaKK = await this.prisma.kk.aggregate({
                _count: {
                    id: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah KK',
                result: jumlahSemuaKK,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data jumlah KK karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data jumlah KK', data: error };
        }
    }

    async jumlahWarga() {
        try {
            const jumlahWarga = await this.prisma.warga.aggregate({
                _count: {
                    id: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah warga',
                result: jumlahWarga,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data jumlah KK karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data jumlah Warga', data: error };
        }
    }

    async jumlahWargaLk() {
        try {
            const jumlahWarga = await this.prisma.warga.aggregate({
                _count: {
                    id: true,
                },
                where: {
                    jenis_kelamin: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah warga',
                result: jumlahWarga,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data jumlah KK karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data jumlah Warga', data: error };
        }
    }

    async jumlahWargaPr() {
        try {
            const jumlahWarga = await this.prisma.warga.aggregate({
                _count: {
                    id: true,
                },
                where: {
                    jenis_kelamin: false,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data jumlah warga',
                result: jumlahWarga,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data jumlah KK karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data jumlah Warga', data: error };
        }
    }

    async listAllWargaLk() {
        try {
            const listWarga = await this.prisma.warga.findMany({
                select: {
                    id: true,
                    nama: true,
                    tempat_lahir: true,
                    tanggal_lahir: true,
                    no_hp: true,
                    nik: true,
                    kk: {
                        select: {
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
                where: {
                    jenis_kelamin: true,
                },
                orderBy: {
                    kk: {
                        blok: {
                            id: 'asc',
                        },
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
            return { status: 'nok', message: 'gagal dapat data warganya, maaf', data: error };
        }
    }

    async listAllWargaPr() {
        try {
            const listWarga = await this.prisma.warga.findMany({
                select: {
                    id: true,
                    nama: true,
                    tempat_lahir: true,
                    tanggal_lahir: true,
                    no_hp: true,
                    nik: true,
                    kk: {
                        select: {
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
                where: {
                    jenis_kelamin: false,
                },
                orderBy: {
                    kk: {
                        blok: {
                            id: 'asc',
                        },
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
            return { status: 'nok', message: 'gagal dapat data warganya, maaf', data: error };
        }
    }

    async getPhotoKK(id: string) {
        try {
            const dataKK = await this.prisma.filekeluarga.findFirst({
                select: {
                    id: true,
                    nama: true,
                    keterangan: true,
                    url: true,
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
                                    id_type: 1,
                                },
                            },
                        },
                    },
                },
                where: {
                    id_kk: parseInt(id),
                },
            });
            return {
                status: 'ok',
                message: 'berhasil mendapatkan data KK',
                result: dataKK,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal dapat data fptp KK',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data warganya, maaf', data: error };
        }
    }

    async getPhotoKTP(id: string) {
        try {
            const dataKK = await this.prisma.photo_warga.findFirst({
                select: {
                    id: true,
                    nama: true,
                    keterangan: true,
                    url: true,
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
                },
                where: {
                    id_warga: parseInt(id),
                },
            });
            return {
                status: 'ok',
                message: 'berhasil mendapatkan data KTP',
                result: dataKK,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal dapat data Foto KTP',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data warganya, maaf', data: error };
        }
    }

    async createGPSLocationKK(createGpsLocation: CreateGpsLocationDto) {
        try {
            const createGpsLocationKK = await this.prisma.gps_location.create({
                data: {
                    uuid: uuidv4(),
                    longitude: createGpsLocation.longitude,
                    latitude: createGpsLocation.latitude,
                    id_kk: createGpsLocation.id_kk,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil membuat GPS Location KK',
                result: createGpsLocationKK,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal buat GPS Location KK',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal buat GPS Location KK, maaf', data: error };
        }
    }

    async editGPSLocationKK(createGpsLocation: CreateGpsLocationDto) {
        try {
            const createGpsLocationKK = await this.prisma.gps_location.update({
                data: {
                    longitude: createGpsLocation.longitude,
                    latitude: createGpsLocation.latitude,
                    id_kk: createGpsLocation.id_kk,
                },
                where: {
                    id: createGpsLocation.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil Edit GPS Location KK',
                result: createGpsLocationKK,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal buat GPS Location KK',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal Edit GPS Location KK, maaf', data: error };
        }
    }

    async TambahPekerjaan(pekerjaan: PekerjaanWargaDto) {
        try {
            const addPekerjaan = await this.prisma.pekerjaan.create({
                data: {
                    uuid: uuidv4(),
                    nama: pekerjaan.nama,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah daftar pekerjaan',
                result: addPekerjaan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal tambah data pekerjaan',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah data pekerjaan warga, maaf',
                data: error,
            };
        }
    }

    async updatePekerjaan(pekerjaan: PekerjaanWargaDto) {
        try {
            const editPekerjaan = await this.prisma.pekerjaan.update({
                where: {
                    id: pekerjaan.id,
                },
                data: {
                    nama: pekerjaan.nama,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil update daftar pekerjaan',
                result: editPekerjaan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal tambah data pekerjaan',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah data pekerjaan, maaf', data: error };
        }
    }

    async tambahStatusWarga(statusWarga: StatusWargaDto) {
        try {
            const createStatusWarga = await this.prisma.status_warga.create({
                data: {
                    uuid: uuidv4(),
                    status: statusWarga.status,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah status warga',
                result: createStatusWarga,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal tambah status warga',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah status warga, maaf', data: error };
        }
    }

    async listPekerjaan() {
        try {
            const daftarKerjaan = await this.prisma.pekerjaan.findMany({
                select: {
                    id: true,
                    nama: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat daftar pekerjaan',
                result: daftarKerjaan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal daftar pekerjaan warga',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data pekerjaan warga, maaf',
                data: error,
            };
        }
    }

    async listStatusWarga() {
        try {
            const daftarStatus = await this.prisma.status_warga.findMany({
                select: {
                    id: true,
                    status: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat daftar status',
                result: daftarStatus,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal daftar status warga',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal dapat data status warga, maaf',
                data: error,
            };
        }
    }
}
