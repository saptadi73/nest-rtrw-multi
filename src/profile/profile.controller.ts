import { Body, Controller, Get, Header, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Profile } from './profile';
import { CreateEntityDto } from './dto/create.entity.dto';
import { CreatePolygonDto } from './dto/create.polygon.dto';
import { FindWilayahDto } from './dto/find.wilayah.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profile: Profile) {}

    @Post('create')
    @Header('Content-Type', 'application/json')
    async buatEntity(@Body() createEntity: CreateEntityDto) {
        try {
            return this.profile.createProfile(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('edit')
    @Header('Content-Type', 'application/json')
    async editEntity(@Body() createEntity: CreateEntityDto) {
        try {
            return this.profile.editProfile(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('new/polygon')
    @Header('Content-Type', 'application/json')
    async buatPolygon(@Body() createEntity: CreatePolygonDto) {
        try {
            return this.profile.createPolygon(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('edit/polygon')
    @Header('Content-Type', 'application/json')
    async editPolygon(@Body() createEntity: CreatePolygonDto) {
        try {
            return this.profile.editPolygon(createEntity);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('provinsi')
    async getProvinsi() {
        try {
            return this.profile.cariProvinsi();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('kabupaten')
    @Header('Content-Type', 'application/json')
    async getKabupaten(@Body() findWilayah: FindWilayahDto) {
        try {
            return this.profile.cariKabupaten(findWilayah);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('kecamatan')
    @Header('Content-Type', 'application/json')
    async getKecamatan(@Body() findWilayah: FindWilayahDto) {
        try {
            return this.profile.cariKecamatan(findWilayah);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Post('desa')
    @Header('Content-Type', 'application/json')
    async getDesa(@Body() findWilayah: FindWilayahDto) {
        try {
            return this.profile.cariDesa(findWilayah);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('cek')
    async cek() {
        try {
            return this.profile.cekProfile();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('polygon')
    async getDataPolygon() {
        try {
            return this.profile.getDataPolygon();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('clear')
    async clear() {
        try {
            return this.profile.hapusDataPolygon();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('cari')
    async cariProfile() {
        try {
            return this.profile.getProfile();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }

    @Get('hapus')
    async hapusProfile() {
        try {
            return this.profile.hapusDataProfile();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: 'Forbidden Access',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                }
            );
        }
    }
}
