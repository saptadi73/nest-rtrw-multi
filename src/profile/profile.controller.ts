import {
    Body,
    Controller,
    Get,
    Header,
    UseGuards,
    HttpException,
    HttpStatus,
    Post,
    Param,
} from '@nestjs/common';
import { Profile } from './profile';
import { CreateEntityDto } from './dto/create.entity.dto';
import { CreatePolygonDto } from './dto/create.polygon.dto';
import { FindWilayahDto } from './dto/find.wilayah.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateTenantDto } from './dto/create.tenant.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profile: Profile) {}

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
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
    async cek(@Body() createEntity: CreateEntityDto) {
        try {
            return this.profile.cekProfile(createEntity);
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

    @Get('polygon/:id')
    async getDataPolygon(@Param('id') id: string) {
        try {
            return this.profile.getDataPolygon(id);
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
    async clear(@Param('id') id: string) {
        try {
            return this.profile.hapusDataPolygon(id);
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

    @Get('cari/:id')
    async cariProfile(@Param('id') id: string) {
        try {
            return this.profile.getProfile(id);
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
    async hapusProfile(@Param('id') id: string) {
        try {
            return this.profile.hapusDataProfile(id);
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

    @Post('add/tenant')
    @Header('Content-Type', 'application/json')
    async addTenant(@Body() tenant: CreateTenantDto) {
        try {
            return this.profile.createTenant(tenant);
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

    @Get('list/tenant')
    async getListTenant() {
        try {
            return this.profile.listTenant();
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
