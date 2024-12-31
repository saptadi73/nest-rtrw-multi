import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { WargaModule } from './warga/warga.module';
import { BayarModule } from './bayar/bayar.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
    imports: [WargaModule, BayarModule, UserModule, MailerModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
