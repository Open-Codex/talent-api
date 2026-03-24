import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class AssignSkillsDto {
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	skills!: string[];
}
