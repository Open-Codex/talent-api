import {
	Injectable,
	ConflictException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
	constructor(private prisma: PrismaService) {}

	async createSkill(dto: CreateSkillDto) {
		const existing = await this.prisma.skill.findUnique({
			where: { name: dto.name },
		});

		if (existing) {
			throw new ConflictException('Skill already exists');
		}

		return this.prisma.skill.create({
			data: {
				name: dto.name.toLocaleLowerCase(),
				category: dto.category,
			},
		});
	}

	async findAll() {
		return this.prisma.skill.findMany({
			orderBy: { name: 'asc' },
		});
	}

	async assignSkillsToDeveloper(userId: string, skills: string[]) {
		const existingSkills = await this.prisma.skill.findMany({
			where: {
				name: {
					in: skills.map((s) => s.toLocaleLowerCase()),
				},
			},
		});

		if (existingSkills.length !== skills.length) {
			throw new NotFoundException('One or more skills not found');
		}

		await this.prisma.developerSkill.deleteMany({
			where: { developerId: userId },
		});

		await this.prisma.developerSkill.createMany({
			data: existingSkills.map((skill) => ({
				developerId: userId,
				skillId: skill.id,
			})),
		});

		return { message: 'Skills updated successfully' };
	}
}
