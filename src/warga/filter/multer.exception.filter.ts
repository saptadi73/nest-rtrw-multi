import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
    catch(exception: MulterError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const errorMessage =
            {
                LIMIT_FILE_SIZE: 'File size exceeds the limit!',
                LIMIT_UNEXPECTED_FILE: 'Unexpected file field!',
            }[exception.code] || 'File upload failed';

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: errorMessage,
            error: exception.code,
        });
    }
}
