import {
	IsOptional,
	IsString,
	IsBoolean,
	IsInt,
	Min,
	IsEnum,
} from 'class-validator';
import { Seniority, AvatarStyle } from '@prisma/client';

export class UpdateDeveloperDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEnum(Seniority)
	seniority?: Seniority;

	@IsOptional()
	@IsString()
	role?: string;

	@IsOptional()
	@IsString()
	bio?: string;

	@IsOptional()
	@IsString()
	readme?: string;

	@IsOptional()
	@IsString()
	location?: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	experienceYears?: number;

	@IsOptional()
	@IsEnum(AvatarStyle)
	avatarStyle?: AvatarStyle;

	@IsOptional()
	@IsBoolean()
	remoteOk?: boolean;

	@IsOptional()
	@IsString()
	githubUrl?: string;

	@IsOptional()
	@IsString()
	linkedinUrl?: string;

	@IsOptional()
	@IsString()
	twitterUrl?: string;

	@IsOptional()
	@IsString()
	portfolioUrl?: string;
}
