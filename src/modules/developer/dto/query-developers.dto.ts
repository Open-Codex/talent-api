import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { DeveloperStatus, Seniority } from '@prisma/client';

export class QueryDeveloperDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	limit?: number = 10;

	@IsOptional()
	@IsString()
	stack?: string;

	@IsOptional()
	@IsString()
	location?: string;

	@IsOptional()
	@IsEnum(Seniority)
	seniority?: Seniority;

	@IsOptional()
	@IsEnum(DeveloperStatus)
	status?: DeveloperStatus;

	@IsOptional()
	@IsString()
	role?: string;
}
