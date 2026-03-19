import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { Seniority } from '@prisma/client';

export class RegisterDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(6)
	password!: string;

	@IsString()
	name!: string;

	@IsString()
	username!: string;

	@IsEnum(Seniority)
	seniority!: Seniority;

	@IsString()
	role!: string;
}
