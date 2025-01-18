import { Injectable } from '@nestjs/common';
import { PrismaProfileService } from './prisma.profle.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateEntityDto } from './dto/create.entity.dto';
import { Prisma } from '@prisma/client';
import { CreatePolygonDto } from './dto/create.polygon.dto';

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
                    id: 1,
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

    async createPolygon(createPolygon: CreatePolygonDto) {
        try {
            const createPolygonResult = await this.prisma.polygon.create({
                data: {
                    latitude: createPolygon.latitude,
                    longitude: createPolygon.longitude,
                    uuid: uuidv4(),
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
}
