import { Exclude, Expose } from 'class-transformer';

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

	constructor(partial: Partial<DeveloperEntity>) {
		Object.assign(this, partial);
	}
}
