import {
    Body,
    Controller,
    Get,
    Header,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileNameEditor, ImageFileFilter } from './file.utils';
import { CreatePhotoUserDto } from './dto/create.photo.user.dto';
import { CreateLevelDto } from './dto/create.level.dto';
import { AktifUserDto } from './dto/aktif.user.dto';

@Controller('user')
export class UserController {
    constructor(private User: UserService) {}

    @Post('add')
    @Header('Content-Type', 'application/json')
    async addUser(@Body() userCreate: CreateUserDto) {
        try {
            return this.User.createNewUser(userCreate);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('login')
    @Header('Content-Type', 'application/json')
    async loginUser(@Body() login: LoginUserDto) {
        try {
            return this.User.loginUser(login);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('aktif/:id')
    async aktifkan(@Param('id') id: string) {
        try {
            return this.User.aktifUser(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('photo')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: FileNameEditor,
                destination: './uploads',
            }),
            limits: {
                fileSize: 1000 * 1000 * 10,
            },
            fileFilter: ImageFileFilter,
        })
    )
    async uploadPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileuploaddto: CreatePhotoUserDto
    ) {
        try {
            return this.User.photoUpload(fileuploaddto, file);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('add/level')
    @Header('Content-Type', 'application/json')
    async nambahLevelUser(@Body() createLevel: CreateLevelDto) {
        try {
            return this.User.addLevel(createLevel);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('daftar/level/user')
    async getLevelUser() {
        try {
            return this.User.daftarLevelUser();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('list/user')
    async getUser() {
        try {
            return this.User.listUser();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('delete/user')
    @Header('Content-Type', 'application/json')
    async deleteUser(@Body() createLevel: AktifUserDto) {
        try {
            return this.User.deleteUser(createLevel);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: error,
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }
}
