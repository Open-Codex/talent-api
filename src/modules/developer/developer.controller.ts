import { Controller, Get } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { DeveloperEntity } from './entities/developer.entity';
import { Query } from '@nestjs/common';
import { QueryDeveloperDto } from './dto/query-developers.dto';

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
}
