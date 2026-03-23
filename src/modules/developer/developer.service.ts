import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryDeveloperDto } from './dto/query-developers.dto';

@Injectable()
export class DeveloperService {
	constructor(private prisma: PrismaService) {}

	async findAll(query: QueryDeveloperDto) {
		const { page = 1, limit = 10 } = query;
		const skip = (page - 1) * limit;

		const [data, total] = await this.prisma.$transaction([
			this.prisma.developer.findMany({
				skip,
				take: limit,
				orderBy: {
					createdAt: 'desc',
				},
			}),
			this.prisma.developer.count(),
		]);

		return {
			data,
			meta: {
				total,
				page,
				lastPage: Math.ceil(total / limit),
			},
		};
	}
}
