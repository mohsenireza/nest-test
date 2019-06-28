import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    async generateJwtToken(payload: Payload) {
        return jwt.sign(payload, 'secretKey', {expiresIn: '24h'});
    }

    async validateUser(payload: Payload) {
        return await this.usersService.findOneByPayload(payload);
    }
}
