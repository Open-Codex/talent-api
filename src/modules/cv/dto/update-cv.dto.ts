import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCvDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	@IsOptional()
	content?: string;

	@IsBoolean()
	@IsOptional()
	isDefault?: boolean;
}
