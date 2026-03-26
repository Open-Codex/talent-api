import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryDeveloperDto } from './dto/query-developers.dto';
import { Prisma } from '@prisma/client';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Injectable()
export class DeveloperService {
	constructor(private prisma: PrismaService) {}

	async findAll(query: QueryDeveloperDto) {
		const {
			page = 1,
			limit = 10,
			stack,
			location,
			seniority,
			status,
			role,
		} = query;
		const skip = (page - 1) * limit;
		const where: Prisma.DeveloperWhereInput = {};

		// Filters
		if (location) {
			where.location = {
				contains: location,
				mode: 'insensitive',
			};
		}

		if (seniority) {
			where.seniority = seniority;
		}

		if (status) {
			where.status = status;
		}

		// Stack Filter
		if (stack) {
			const skillsArray = stack.split(',').map((s) => s.trim());

			where.skills = {
				some: {
					skill: {
						name: {
							in: skillsArray,
							mode: 'insensitive',
						},
					},
				},
			};
		}

		if (role) {
			where.role = {
				contains: role,
				mode: 'insensitive',
			};
		}

		const [data, total] = await this.prisma.$transaction([
			this.prisma.developer.findMany({
				where,
				skip,
				take: limit,
				orderBy: {
					createdAt: 'desc',
				},
				select: {
					id: true,
					name: true,
					username: true,
					seniority: true,
					role: true,
					bio: true,
					location: true,
					experienceYears: true,
					avatarStyle: true,
					avatarSeed: true,
					status: true,
					remoteOk: true,
					featured: true,

					skills: {
						select: {
							skill: {
								select: {
									name: true,
									category: true,
								},
							},
						},
					},
				},
			}),
			this.prisma.developer.count({ where }),
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

	async findByUsername(username: string) {
		const developer = await this.prisma.developer.findUnique({
			where: { username },
			include: {
				skills: {
					include: {
						skill: true,
					},
				},
				projects: true,
			},
		});

		if (!developer) {
			throw new NotFoundException('Developer not found');
		}

		return developer;
	}

	async findFeatured(limit = 6) {
		const data = await this.prisma.developer.findMany({
			where: {
				featured: true,
			},
			take: limit,
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				name: true,
				username: true,
				seniority: true,
				role: true,
				bio: true,
				location: true,
				experienceYears: true,
				avatarStyle: true,
				avatarSeed: true,
				status: true,
				remoteOk: true,
				featured: true,

				skills: {
					select: {
						skill: {
							select: {
								name: true,
								category: true,
							},
						},
					},
				},
			},
		});

		return data;
	}

	async updateProfile(userId: string, dto: UpdateDeveloperDto) {
		const updated = await this.prisma.developer.update({
			where: { id: userId },
			data: dto,
		});

		return updated;
	}
}
