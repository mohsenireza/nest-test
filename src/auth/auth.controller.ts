import { Controller, Post, Body } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { Payload } from '../types/payload';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {

constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}

@Post('login')
async login(@Body() loginDto: loginDto) {
    const user = await this.usersService.findOneByLogin(loginDto);
    const payload: Payload = {
        username: user.username
    };
    const token = this.authService.generateJwtToken(payload);
    return token;
}

@Post('register')
async register(@Body() registerDto: registerDto) {
    const user = await this.usersService.create(registerDto);
    const payload: Payload = {
        username: user.username
    };
    const token = this.authService.generateJwtToken(payload);
    return token;
}

}
