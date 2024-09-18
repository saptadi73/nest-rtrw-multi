import { Module } from '@nestjs/common';
import { Warga } from './warga';
import { WargaController } from './warga.controller';
import { PrismaWargaService } from './prisma.warga.service';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DIR } from './constantan.main';

@Module({
    imports: [
        MulterModule.register({
            dest: FILE_UPLOAD_DIR,
            limits: {
                fieldNameSize: 1000 * 1000 * 10,
            },
        }),
    ],
    providers: [Warga, PrismaWargaService],
    controllers: [WargaController],
})
export class WargaModule {}
