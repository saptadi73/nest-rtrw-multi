import { Injectable } from '@nestjs/common';
import { PrismaUserService } from './prisma.user.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login.user.dto';
import { v4 as uuidv4 } from 'uuid';

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
                    password: this.hashMD5(userCreate.pasword),
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

    async loginUser(loginUser: LoginUserDto) {
        try {
            const login = await this.prisma.user.findFirst({
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
                            password: this.hashMD5(loginUser.pasword),
                        },
                    ],
                },
            });
            const createToken = await this.prisma.token.create({
                data: {
                    token: this.randomChar(),
                    id_user: login.id,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil login',
                data: login,
                data2: createToken,
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
            return { status: 'nok', message: 'gagal login', data: error };
        }
    }

    async gantiPassword(editPassword: CreateUserDto) {
        try {
            const gantiPassword = await this.prisma.user.update({
                data: {
                    userid: editPassword.userid,
                    password: this.hashMD5(editPassword.pasword),
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
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    async findToken(token: string) {
        try {
            const cariToken = await this.prisma.token.findFirst({
                select: {
                    token: true,
                    id_user: true,
                    id: true,
                    createdAt: true,
                },
                where: {
                    token: token,
                },
            });
            return {
                status: 'ok',
                message: 'berhasil dapat Token',
                data: cariToken,
            };
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
}
