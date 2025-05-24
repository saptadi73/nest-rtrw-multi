import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '6f91c7a0-ebd5-42bc-babb-507d0afb5979', // Use environment variables in production!
        });
    }

    async validate(payload: any) {
        // <-- Add this method
        return payload;
    }
}
