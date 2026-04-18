import {
	Injectable,
	NotFoundException,
	ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from '@prisma/client';

@Injectable()
export class CvService {
	constructor(private prisma: PrismaService) {}

	async findAll(userId: string): Promise<Cv[]> {
		return this.prisma.cv.findMany({
			where: { developerId: userId },
			orderBy: { createdAt: 'desc' },
		});
	}

	async findOne(id: string, userId: string): Promise<Cv> {
		const cv = await this.prisma.cv.findFirst({
			where: {
				id,
				developerId: userId,
			},
		});

		if (!cv) {
			throw new NotFoundException('CV not found');
		}

		return cv;
	}

	async create(userId: string, dto: CreateCvDto): Promise<Cv> {
		const developer = await this.prisma.developer.findFirst({
			where: { id: userId },
		});

		if (!developer) {
			throw new NotFoundException('Developer profile not found');
		}

		if (dto.isDefault) {
			await this.prisma.cv.updateMany({
				where: { developerId: developer.id, isDefault: true },
				data: { isDefault: false },
			});
		}

		return this.prisma.cv.create({
			data: {
				title: dto.title,
				content: dto.content,
				isDefault: dto.isDefault ?? false,
				developerId: developer.id,
			},
		});
	}

	async update(id: string, userId: string, dto: UpdateCvDto): Promise<Cv> {
		const cv = await this.findOne(id, userId);

		if (dto.isDefault) {
			await this.prisma.cv.updateMany({
				where: {
					developerId: cv.developerId,
					isDefault: true,
					id: { not: id },
				},
				data: { isDefault: false },
			});
		}

		return this.prisma.cv.update({
			where: { id },
			data: {
				...(dto.title !== undefined && { title: dto.title }),
				...(dto.content !== undefined && { content: dto.content }),
				...(dto.isDefault !== undefined && { isDefault: dto.isDefault }),
			},
		});
	}

	async delete(id: string, userId: string): Promise<void> {
		await this.findOne(id, userId);

		await this.prisma.cv.delete({ where: { id } });
	}
}
