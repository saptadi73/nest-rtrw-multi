import { Injectable } from '@nestjs/common';
import { PrismaProfileService } from './prisma.profle.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateEntityDto } from './dto/create.entity.dto';
import { Prisma } from '@prisma/client';
import { CreatePolygonDto } from './dto/create.polygon.dto';
import { FindWilayahDto } from './dto/find.wilayah.dto';
import { CreateTenantDto } from './dto/create.tenant.dto';

@Injectable()
export class Profile {
    constructor(private prisma: PrismaProfileService) {}

    async createProfile(createEntityDto: CreateEntityDto) {
        try {
            const profile = await this.prisma.entity.create({
                data: {
                    uuid: uuidv4(),
                    dusun: createEntityDto.dusun,
                    desa: createEntityDto.desa,
                    kecamatan: createEntityDto.kecamatan,
                    kabupaten: createEntityDto.kabupaten,
                    provinsi: createEntityDto.provinsi,
                    rt: createEntityDto.rt,
                    rw: createEntityDto.rw,
                    kode_wilayah: createEntityDto.kode_wilayah,
                    tenant: {
                        connect: {
                            id: createEntityDto.id_tenant,
                        },
                    },
                },
            });
            return { status: 'ok', message: 'berhasil isi profile', result: profile };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal isi profile karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal create profile', data: error };
        }
    }

    async editProfile(createEntityDto: CreateEntityDto) {
        try {
            const editProfile = await this.prisma.entity.update({
                where: {
                    id: createEntityDto.id,
                },
                data: {
                    dusun: createEntityDto.dusun,
                    desa: createEntityDto.desa,
                    kecamatan: createEntityDto.kecamatan,
                    kabupaten: createEntityDto.kabupaten,
                    provinsi: createEntityDto.provinsi,
                    rt: createEntityDto.rt,
                    rw: createEntityDto.rw,
                    kode_wilayah: createEntityDto.kode_wilayah,
                },
            });
            return { status: 'ok', message: 'berhasil update profile', result: editProfile };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal edit profile karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal edit profile', data: error };
        }
    }

    async cekProfile(createEntitydto: CreateEntityDto) {
        try {
            const cekEntity = await this.prisma.entity.findUnique({
                where: {
                    id: createEntitydto.id,
                },
                select: {
                    provinsi: true,
                    kabupaten: true,
                    kecamatan: true,
                    desa: true,
                    rt: true,
                    rw: true,
                    dusun: true,
                    kode_wilayah: true,
                },
            });
            return { status: 'ok', message: 'berhasil update profile', result: cekEntity };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal edit profile karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal edit profile', data: error };
        }
    }

    async createPolygon(createPolygon: CreatePolygonDto) {
        try {
            const createPolygonResult = await this.prisma.polygon.create({
                data: {
                    latitude: createPolygon.latitude,
                    longitude: createPolygon.longitude,
                    uuid: uuidv4(),
                    tenant: {
                        connect: {
                            id: createPolygon.id_tenant,
                        },
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil create polygon',
                result: createPolygonResult,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal isi polygon karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tambah polygon', data: error };
        }
    }

    async editPolygon(createPolygon: CreatePolygonDto) {
        try {
            const editPolygon = await this.prisma.polygon.update({
                where: {
                    id: createPolygon.id,
                },
                data: {
                    latitude: createPolygon.latitude,
                    longitude: createPolygon.longitude,
                },
            });
            return { status: 'ok', message: 'berhasil edit polygon', result: editPolygon };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal edit polygon karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal edit Polygon', data: error };
        }
    }

    async getDataPolygon(id_tenant: string) {
        try {
            const dataPolygon = await this.prisma.polygon.findMany({
                select: {
                    latitude: true,
                    longitude: true,
                },
                where: {
                    tenant: {
                        id: id_tenant,
                    },
                },
                orderBy: {
                    id: 'asc',
                },
            });
            return { status: 'ok', message: 'berhasil dapat data polygon', result: dataPolygon };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data polygon karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data Polygon', data: error };
        }
    }

    async hapusDataPolygon(id_tenant: string) {
        try {
            const dataPolygon = await this.prisma.polygon.deleteMany({
                where: {
                    tenant: {
                        id: id_tenant,
                    },
                },
            });
            return { status: 'ok', message: 'berhasil delete data polygon', result: dataPolygon };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal hapus data polygon karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal hapus data Polygon', data: error };
        }
    }

    async cariProvinsi() {
        try {
            const cariWilayah = await this.prisma
                .$queryRaw`select w.kode,w.wilayah from wilayah w where length(w.kode)=2`;
            return { status: 'ok', message: 'berhasil cari provinsi', result: cariWilayah };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal cari data wilayah provinsi karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal cari data wilayah provinsi', data: error };
        }
    }

    async cariKabupaten(findWilayah: FindWilayahDto) {
        try {
            const cariWilayah = await this.prisma
                .$queryRaw`select w.kode,w.wilayah from wilayah w where length(w.kode)=4 and substring(w.kode,1,2)=${findWilayah.kode}`;
            return {
                status: 'ok',
                message: 'berhasil cari kabupaten yang anda maksud',
                result: cariWilayah,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal cari data wilayah kabupaten karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal cari data wilayah provinsi', data: error };
        }
    }

    async cariKecamatan(findWilayah: FindWilayahDto) {
        try {
            const cariWilayah = await this.prisma
                .$queryRaw`select w.kode,w.wilayah from wilayah w where length(w.kode)=6 and substring(w.kode,1,4)=${findWilayah.kode}`;
            return { status: 'ok', message: 'berhasil cari data kecamatan', result: cariWilayah };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal cari data wilayah kecamatan karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal cari data wilayah kecamatan', data: error };
        }
    }

    async cariDesa(findWilayah: FindWilayahDto) {
        try {
            const cariWilayah = await this.prisma
                .$queryRaw`select w.kode,w.wilayah from wilayah w where length(w.kode)=10 and substring(w.kode,1,6)=${findWilayah.kode}`;
            return { status: 'ok', message: 'berhasil cari provinsi', result: cariWilayah };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal cari data wilayah desa karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal cari data wilayah desa', data: error };
        }
    }

    async getProfile(id_tenant: string) {
        try {
            const cariProfile = await this.prisma.entity.findFirst({
                select: {
                    id: true,
                    provinsi: true,
                    kabupaten: true,
                    kecamatan: true,
                    desa: true,
                    kode_wilayah: true,
                    rt: true,
                    rw: true,
                    dusun: true,
                },
                where: {
                    tenant: {
                        id: id_tenant,
                    },
                },
            });
            return { status: 'ok', message: 'berhasil get profile', result: cariProfile };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal cari data wilayah desa karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal cari data wilayah desa', data: error };
        }
    }

    async hapusDataProfile(id_tenant: string) {
        try {
            const dataPolygon = await this.prisma.entity.deleteMany({
                where: {
                    tenant: {
                        id: id_tenant,
                    },
                },
            });
            return { status: 'ok', message: 'berhasil delete data entity', result: dataPolygon };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal hapus data entity karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal hapus data entity', data: error };
        }
    }

    async createTenant(createTenant: CreateTenantDto) {
        try {
            const createTenantku = await this.prisma.tenant.create({
                data: {
                    nama: createTenant.nama,
                    keterangan: createTenant.keterangan,
                    no_hp: createTenant.no_hp,
                },
            });
            return { status: 'ok', message: 'berhasil tambah data tenant', result: createTenantku };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah tenant karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal htambah tenant', data: error };
        }
    }

    async listTenant() {
        try {
            const daftarTenant = await this.prisma.tenant.findMany();
            return { status: 'ok', message: 'berhasil dapat data tenant', result: daftarTenant };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal dapat data tenant karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data tenant', data: error };
        }
    }
}
