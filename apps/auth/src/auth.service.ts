import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersDocument } from './users/models/user.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UsersDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload, {
      // secret: this.configService.get('JWT_SECRET'),
      // expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    });

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'none',
    });
  }
}