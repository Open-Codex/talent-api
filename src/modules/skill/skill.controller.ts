import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { AssignSkillsDto } from './dto/assign-skills.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
	constructor(private readonly skillService: SkillService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a Skill' })
	create(@Body() dto: CreateSkillDto) {
		return this.skillService.createSkill(dto);
	}

	@Get()
	@ApiOperation({ summary: 'List all Skills' })
	findAll() {
		return this.skillService.findAll();
	}

	@Post('me')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Assign Skills to current Developer' })
	assignSkills(@CurrentUser() user: any, @Body() dto: AssignSkillsDto) {
		return this.skillService.assignSkillsToDeveloper(user.userId, dto.skills);
	}
}
