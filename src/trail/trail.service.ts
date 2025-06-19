import { Injectable } from '@nestjs/common';
import { PrismaTrailService } from './prisma.trail.service';
import { WriteTrailDto } from './dto/write.trail.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrailService {
    constructor(private prisma: PrismaTrailService) {}

    async WriteTrailLog(writedto: WriteTrailDto) {
        try {
            const trail = await this.prisma.trail.create({
                data: {
                    email: writedto.email,
                    activity: writedto.activity,
                    tenant: {
                        connect: {
                            id: writedto.id_tenant,
                        },
                    },
                },
            });
            return {
                status: 'ok',
                message: 'berhasil tulis log',
                result: trail,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('failed unique constraint');
                    return {
                        status: 'nok',
                        message: 'gagal tulis log',
                        data: error,
                    };
                }
            }
            return { status: 'nok', message: 'gagal tulis log', data: error };
        }
    }
}
