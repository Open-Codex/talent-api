import { Exclude, Expose, Type } from 'class-transformer';

class SkillItem {
	@Expose()
	name!: string;

	@Expose()
	category!: string;
}

class DeveloperSkillEntity {
	@Expose()
	@Type(() => SkillItem)
	skill!: SkillItem;
}

export class DeveloperEntity {
	@Expose()
	id!: string;
	@Expose()
	email!: string;

	@Exclude()
	passwordHash!: string;

	@Expose()
	name!: string;

	@Expose()
	username!: string;

	@Expose()
	seniority!: string;

	@Expose()
	role!: string;

	@Expose()
	bio?: string;

	@Expose()
	readme?: string;

	@Expose()
	location?: string;

	@Expose()
	experienceYears!: number;

	@Expose()
	avatarStyle!: string;

	@Expose()
	avatarSeed!: string;

	@Expose()
	status!: string;

	@Expose()
	remoteOk!: boolean;

	@Expose()
	githubUrl?: string;

	@Expose()
	linkedinUrl?: string;

	@Expose()
	twitterUrl?: string;

	@Expose()
	portfolioUrl?: string;

	@Expose()
	featured!: boolean;

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;

	@Expose()
	@Type(() => DeveloperSkillEntity)
	skills!: DeveloperSkillEntity[];

	@Expose()
	projects!: any[];

	constructor(partial: Partial<DeveloperEntity>) {
		Object.assign(this, partial);
	}
}
