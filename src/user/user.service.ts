import { Injectable } from '@nestjs/common';
import { PrismaUserService } from './prisma.user.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login.user.dto';
import { v4 as uuidv4 } from 'uuid';
import { differenceInHours } from 'date-fns';
import { FindTokenDto } from './dto/find.token.dto';
import { CreatePhotoUserDto } from './dto/create.photo.user.dto';
import { CreateLevelDto } from './dto/create.level.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaUserService) {}

    hashMD5(data: string): string {
        return crypto.createHash('md5').update(data).digest('hex');
    }

    async createNewUser(userCreate: CreateUserDto) {
        try {
            const tambahUser = await this.prisma.user.create({
                data: {
                    userid: userCreate.userid,
                    password: this.hashMD5(userCreate.password),
                    uuid: uuidv4(),
                    level: {
                        connect: {
                            id: userCreate.id_level,
                        },
                    },
                },
            });
            return { status: 'ok', message: 'berhasil tambah user id', result: tambahUser };
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
            return { status: 'nok', message: 'gagal tambah userid', data: error };
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
                message: 'berhasil aktifkan user',
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
            const loginsaya = await this.prisma.user.findMany({
                select: {
                    userid: true,
                    password: true,
                    level: true,
                    id: true,
                },
                where: {
                    AND: [
                        {
                            userid: loginUser.userid,
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
            const randomnya = this.randomChar();
            const waktuNow = new Date();

            const createTokenku = await this.prisma.token.create({
                data: {
                    token: randomnya,
                    id_user: loginsaya[0].id,
                    lastLogin: waktuNow,
                },
            });

            return {
                status: 'ok',
                message: 'berhasil login',
                data: loginsaya[0].id,
                data2: createTokenku,
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

    async gantiPassword(editPassword: CreateUserDto) {
        try {
            const gantiPassword = await this.prisma.user.update({
                data: {
                    userid: editPassword.userid,
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

    async findToken(token: FindTokenDto) {
        try {
            const cariToken = await this.prisma.token.findFirst({
                where: {
                    token: token.token,
                },
            });

            // return {
            //     status: 'ok',
            //     message: 'berhasil dapat token',
            //     data: cariToken,
            // };

            const TimeNow = new Date();
            const TimeToken = new Date(cariToken.lastLogin);

            const durasi = differenceInHours(TimeNow, TimeToken);

            if (durasi < 7) {
                const updateLogin = await this.prisma.token.update({
                    where: {
                        id: cariToken.id,
                    },
                    data: {
                        lastLogin: TimeNow,
                    },
                });
                return {
                    status: 'ok',
                    message: 'berhasil dapat Token',
                    data: updateLogin,
                };
            } else {
                return {
                    status: 'nok',
                    message: 'token kadaluwarsa',
                    data: durasi,
                };
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal dapat token',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal dapat token', data: error };
        }
    }

    async delToken(id_token: number) {
        try {
            const hapusToken = await this.prisma.token.delete({
                where: {
                    id: id_token,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil delete Token',
                data: hapusToken,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal delete token',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal delete token', data: error };
        }
    }

    async photoUpload(uploadfile: CreatePhotoUserDto, fileku) {
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
}
