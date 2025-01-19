import { Module } from '@nestjs/common';
import { Warga } from './warga';
import { WargaController } from './warga.controller';
import { PrismaWargaService } from './prisma.warga.service';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DIR } from './constantan.main';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { MulterExceptionFilter } from './filter/multer.exception.filter';

@Module({
    imports: [
        MulterModule.register({
            dest: FILE_UPLOAD_DIR,
            limits: {
                fieldNameSize: 1000 * 1000 * 10,
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'), // Path to static files
            serveRoot: '/images', // URL prefix to access files
        }),
    ],
    providers: [
        Warga,
        PrismaWargaService,
        {
            provide: APP_FILTER,
            useClass: MulterExceptionFilter,
        },
    ],
    controllers: [WargaController],
})
export class WargaModule {}
