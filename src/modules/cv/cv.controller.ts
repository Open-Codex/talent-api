import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Body,
	Param,
	UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
@UseGuards(JwtAuthGuard)
@Serialize(CvEntity)
export class CvController {
	constructor(private readonly cvService: CvService) {}

	@Get()
	findAll(@CurrentUser() user: any) {
		return this.cvService.findAll(user.userId);
	}

	@Get(':id')
	findOne(@Param('id') id: string, @CurrentUser() user: any) {
		return this.cvService.findOne(id, user.userId);
	}

	@Post()
	create(@CurrentUser() user: any, @Body() dto: CreateCvDto) {
		return this.cvService.create(user.userId, dto);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@CurrentUser() user: any,
		@Body() dto: UpdateCvDto,
	) {
		return this.cvService.update(id, user.userId, dto);
	}

	@Delete(':id')
	delete(@Param('id') id: string, @CurrentUser() user: any) {
		return this.cvService.delete(id, user.userId);
	}
}
