import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (ConfigService: ConfigService) => ({
				secret: ConfigService.get<string>('JWT_SECRET_KEY'),
				signOptions: {
					expiresIn: '7d',
				},
			}),
		}),
	],
})
export class AuthModule {}
