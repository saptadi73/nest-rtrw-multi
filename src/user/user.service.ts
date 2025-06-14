import { Injectable } from '@nestjs/common';
import { PrismaUserService } from './prisma.user.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login.user.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreatePhotoUserDto } from './dto/create.photo.user.dto';
import { CreateLevelDto } from './dto/create.level.dto';
import { AktifUserDto } from './dto/aktif.user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaUserService) {}

    hashMD5(data: string): string {
        return crypto.createHash('md5').update(data).digest('hex');
    }

    async createNewUser(userCreate: CreateUserDto) {
        try {
            const uuidku = uuidv4();
            const tambahUser = await this.prisma.user.create({
                data: {
                    email: userCreate.email,
                    password: this.hashMD5(userCreate.password),
                    uuid: uuidku,
                    level: {
                        connect: {
                            id: parseInt(userCreate.id_level),
                        },
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tambah user id',
                result: tambahUser,
                uuid: uuidku,
                email: userCreate.email,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal tambah userid karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal tambah userid atau coba relogin sebelum tambah user',
                data: error,
            };
        }
    }

    async aktifUser(id: string) {
        try {
            const aktifkan = await this.prisma.user.update({
                where: {
                    uuid: id,
                },
                data: {
                    status: true,
                },
            });
            return {
                status: 'ok',
                message: 'Berhasil aktifkan user',
                data: aktifkan,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal aktifkan user',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal aktifkan user',
                data: error,
            };
        }
    }

    async loginUser(loginUser: LoginUserDto) {
        try {
            const loginsaya = await this.prisma.user.findFirst({
                select: {
                    email: true,
                    password: true,
                    level: true,
                    id: true,
                    uuid: true,
                },
                where: {
                    AND: [
                        {
                            email: loginUser.email,
                        },
                        {
                            password: this.hashMD5(loginUser.password),
                        },
                        {
                            status: true,
                        },
                    ],
                },
            });
            return {
                status: 'ok',
                message: 'berhasil login',
                data: loginsaya.id,
                data3: loginsaya,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal login',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal login',
                data: error,
            };
        }
    }

    async logoutUser(uuid: string) {
        try {
            const logOutUser = await this.prisma.user.update({
                where: {
                    uuid: uuid,
                    refresh: {
                        not: null,
                    },
                },
                data: {
                    refresh: null,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil logout',
                data: logOutUser,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal logout',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal logout',
                data: error,
            };
        }
    }

    async refreshTokenAsli(uuid: string, refreshToken: string) {
        try {
            const refreshTokenku = await this.prisma.user.findUnique({
                where: {
                    uuid: uuid,
                },
                select: {
                    refresh: true,
                    email: true,
                    uuid: true,
                    level: {
                        select: {
                            id: true,
                            nama: true,
                        },
                    },
                },
            });
            if (refreshTokenku.refresh === refreshToken) {
                return {
                    status: 'ok',
                    message: 'berhasil refresh',
                    data: refreshTokenku,
                };
            } else {
                return {
                    status: 'nok',
                    message: 'gagal refresh',
                    data: refreshTokenku,
                };
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal refresh failed unique constraint Prisma Client',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal refresh karena error input',
                data: error,
            };
        }
    }

    async updateRefreshToken(uuid: string, token: string) {
        try {
            const refreshToken = await this.prisma.user.update({
                data: {
                    refresh: token,
                },
                where: {
                    uuid: uuid,
                },
            });

            return {
                status: 'ok',
                message: 'berhasil update refresh token',
                data: refreshToken,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal ganti password',
                        data: error,
                    };
                }
            }
            return {
                status: 'nok',
                message: 'gagal update Refresh Token',
                data: error,
            };
        }
    }

    async gantiPassword(editPassword: CreateUserDto) {
        try {
            const gantiPassword = await this.prisma.user.update({
                data: {
                    email: editPassword.email,
                    password: this.hashMD5(editPassword.password),
                },
                where: {
                    id: editPassword.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil ganti password',
                data: gantiPassword,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal ganti password',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal ganti password', data: error };
        }
    }

    randomChar() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 25; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    async photoUpload(uploadfile: CreatePhotoUserDto, fileku) {
        try {
            const uploadPhoto = await this.prisma.photo_user.create({
                data: {
                    nama: uploadfile.nama,
                    keterangan: uploadfile.keterangan,
                    url: fileku.filename,
                    user: {
                        connect: {
                            id: parseInt(uploadfile.id_user),
                        },
                    },
                    uuid: uuidv4(),
                },
            });
            return {
                status: 'ok',
                message: 'berhasil upload photo user',
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

    async addLevel(createLevel: CreateLevelDto) {
        try {
            const tambahLevel = await this.prisma.level.create({
                data: {
                    nama: createLevel.nama,
                    deskripsi: createLevel.deskripsi,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil create level user',
                result: tambahLevel,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal create level karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal create level', data: error };
        }
    }

    async daftarLevelUser() {
        try {
            const listLevel = await this.prisma.level.findMany({
                select: {
                    id: true,
                    nama: true,
                    deskripsi: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data level user',
                result: listLevel,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message:
                            'gagal create level karena ada isian seharusnya unique, diisi berulang',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal create level', data: error };
        }
    }

    async listUser() {
        try {
            const listUserku = await this.prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    uuid: true,
                    id_level: true,
                    status: true,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat data user',
                result: listUserku,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal dapat data user',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat data', data: error };
        }
    }

    async deleteUser(deleteUser: AktifUserDto) {
        try {
            const deleteUserku = await this.prisma.user.delete({
                where: {
                    uuid: deleteUser.uuid,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil hapus data user',
                result: deleteUserku,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal delete data user',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal delete data user', data: error };
        }
    }
}
