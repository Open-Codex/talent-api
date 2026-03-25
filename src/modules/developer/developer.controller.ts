import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import {
	ApiTags,
	ApiOperation,
	ApiBearerAuth,
	ApiResponse,
} from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { DeveloperEntity } from './entities/developer.entity';
import { Query } from '@nestjs/common';
import { QueryDeveloperDto } from './dto/query-developers.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
	constructor(private readonly developerService: DeveloperService) {}

	@Get()
	@Serialize(DeveloperEntity)
	@ApiOperation({ summary: 'List Developers' })
	findAll(@Query() query: QueryDeveloperDto) {
		return this.developerService.findAll(query);
	}

	@Get('featured')
	@Serialize(DeveloperEntity)
	@ApiOperation({ summary: 'Get featured developers' })
	findFeatured(@Query('limit') limit?: string) {
		return this.developerService.findFeatured(Number(limit) || 6);
	}

	@Get(':username')
	@Serialize(DeveloperEntity)
	@ApiOperation({ summary: 'Get Developer public profile' })
	@ApiResponse({ status: 200, description: 'Developer profile' })
	@ApiResponse({ status: 404, description: 'Developer not found' })
	findByUsername(@Param('username') usernname: string) {
		return this.developerService.findByUsername(usernname);
	}

	@Patch('me')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Update current Developer profile' })
	@Serialize(DeveloperEntity)
	updateProfile(@CurrentUser() user: any, @Body() dto: UpdateDeveloperDto) {
		return this.developerService.updateProfile(user.userId, dto);
	}
}
