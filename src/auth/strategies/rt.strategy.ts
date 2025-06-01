import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(cs: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: cs.get<string>('JWT_REFRESH_SECRET'), // Use environment variables in production!
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshTokens = req.get('authorization').replace('Bearer', '').trim();
        return { ...payload, refreshTokens };
    }
}
