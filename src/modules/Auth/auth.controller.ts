import { Body, Controller, Get, ParseFloatPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto';

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("signin")
    signin(@Body() dto: LoginDto) {
        console.log(dto,"login");

        return this.authService.signin(dto);
    }

    @Post("signup")
    signup(@Body()  dto: SignupDto) {
         console.log(dto);

        return this.authService.signup(dto);
    }

}