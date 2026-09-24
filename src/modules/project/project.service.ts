import {
	Injectable,
	NotFoundException,
	ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
	constructor(private prisma: PrismaService) {}

	async createProject(userId: string, dto: CreateProjectDto) {
		return this.prisma.project.create({
			data: {
				...dto,
				developerId: userId,
			},
		});
	}

	async findMyProjects(userId: string) {
		return this.prisma.project.findMany({
			where: { developerId: userId },
			orderBy: { createdAt: 'desc' },
		});
	}

	async findByProjectId(id: string) {
		const project = await this.prisma.project.findUnique({
			where: { id },
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project;
	}

	async updateProject(
		userId: string,
		projectId: string,
		dto: UpdateProjectDto,
	) {
		const project = await this.prisma.project.findUnique({
			where: { id: projectId },
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		if (project.developerId !== userId) {
			throw new ForbiddenException('You cannot edit this project');
		}

		return this.prisma.project.update({
			where: { id: projectId },
			data: dto,
		});
	}

	async removeProject(userId: string, projectId: string) {
		const project = await this.prisma.project.findUnique({
			where: { id: projectId },
		});

		if (!project) {
			throw new NotFoundException('Project not found');
		}

		if (project.developerId !== userId) {
			throw new ForbiddenException('You cannot delete this project');
		}

		await this.prisma.project.delete({
			where: { id: projectId },
		});

		return { message: 'Project deleted' };
	}
}
