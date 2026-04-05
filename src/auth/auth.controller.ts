import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() loginDto: LoginDto): Promise<object> {
        return this.authService.login(loginDto.email, loginDto.password);
    }
}