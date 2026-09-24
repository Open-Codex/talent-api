import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { DeveloperModule } from './modules/developer/developer.module';
import { SkillModule } from './modules/skill/skill.module';
import { ProjectModule } from './modules/project/project.module';
import { CvModule } from './modules/cv/cv.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			throttlers: [
				{
					ttl: 60,
					limit: 20,
				},
			],
		}),
		PrismaModule,
		AuthModule,
		DeveloperModule,
		SkillModule,
		ProjectModule,
		CvModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
