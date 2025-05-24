import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '40540746-d85a-45c6-88d3-85ca1a8a5c8c', // Use environment variables in production!
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshTokens = req.get('authorization').replace('Bearer', '').trim();
        return { ...payload, refreshTokens };
    }
}
