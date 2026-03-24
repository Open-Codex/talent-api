import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateProjectDto {
	@IsString()
	title!: string;

	@IsString()
	description!: string;

	@IsOptional()
	@IsUrl()
	repoUrl?: string;

	@IsOptional()
	@IsUrl()
	productionUrl?: string;
}
