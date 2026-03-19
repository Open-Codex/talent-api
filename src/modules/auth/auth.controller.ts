import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Register a new developer' })
	@ApiResponse({ status: 201, description: 'Developer registered success.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Login a developer' })
	@ApiResponse({ status: 200, description: 'Developer logged in success.' })
	@ApiResponse({ status: 400, description: 'Bad Request.' })
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto);
	}
}
