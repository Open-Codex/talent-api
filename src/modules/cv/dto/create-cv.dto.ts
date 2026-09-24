import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCvDto {
	@IsString()
	title!: string;

	@IsString()
	content!: string;

	@IsBoolean()
	@IsOptional()
	isDefault?: boolean;
}
