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
import { FindTokenDto } from './dto/find.token.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileNameEditor, ImageFileFilter } from './file.utils';
import { CreatePhotoUserDto } from './dto/create.photo.user.dto';

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

    @Post('token')
    @Header('Content-Type', 'application/json')
    async findTokenku(@Body() tokenku: FindTokenDto) {
        try {
            return this.User.findToken(tokenku);
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
                destination: './upload',
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
}
