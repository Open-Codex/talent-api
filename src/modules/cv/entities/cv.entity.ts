import { Exclude, Expose } from 'class-transformer';

Expose();
export class CvEntity {
	@Expose()
	id!: string;

	@Expose()
	title!: string;

	@Expose()
	content!: string;

	@Expose()
	isDefault!: boolean;

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;

	@Expose()
	developerId!: string;
}
