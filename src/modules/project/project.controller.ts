import {
	Controller,
	Post,
	Get,
	Patch,
	Delete,
	Body,
	Param,
	UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	@ApiOperation({ summary: 'Create Project' })
	create(@CurrentUser() user: any, @Body() dto: CreateProjectDto) {
		return this.projectService.createProject(user.userId, dto);
	}

	@Get('me')
	@ApiOperation({ summary: 'Get my projects' })
	findMyProjects(@CurrentUser() user: any) {
		return this.projectService.findMyProjects(user.userId);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update Project' })
	update(
		@CurrentUser() user: any,
		@Param('id') id: string,
		@Body() dto: UpdateProjectDto,
	) {
		return this.projectService.updateProject(user.userId, id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete Project' })
	remove(@CurrentUser() user: any, @Param('id') id: string) {
		return this.projectService.removeProject(user.userId, id);
	}
}
