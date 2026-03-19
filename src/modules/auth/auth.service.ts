import {
	Injectable,
	UnauthorizedException,
	ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.prisma.developer.findFirst({
			where: {
				OR: [{ email: dto.email }, { username: dto.username }],
			},
			select: { id: true },
		});

		if (existingUser) {
			throw new ConflictException('Email or username already in use');
		}

		const passwordHash = await bcrypt.hash(dto.password, 10);

		const user = await this.prisma.developer.create({
			data: {
				email: dto.email,
				passwordHash,
				name: dto.name,
				username: dto.username,
				seniority: dto.seniority,
				role: dto.role,
				experienceYears: 0,
				avatarStyle: 'GEOMETRIC',
				avatarSeed: dto.username,
				status: 'AVAILABLE',
			},
		});

		return this.generateToken(user.id, user.email);
	}

	async login(dto: LoginDto) {
		const user = await this.prisma.developer.findUnique({
			where: { email: dto.email },
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await bcrypt.compare(
			dto.password,
			user.passwordHash,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return this.generateToken(user.id, user.email);
	}

	private generateToken(userId: string, email: string) {
		const payload = { sub: userId, email };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
