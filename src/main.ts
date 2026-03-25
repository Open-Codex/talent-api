import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());

	app.enableCors({
		origin: (origin, callback) => {
			const allowedOrigins = ['https://opencodex.app'];

			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	/**
	 * Api Prefix
	 */
	app.setGlobalPrefix('api/v1');

	/**
	 * Global Validation Pipe
	 */
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	/**
	 * Swagger Setup
	 */
	const config = new DocumentBuilder()
		.setTitle('OpenCodex Talent API')
		.setDescription('Professional Developer Hub API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api/docs', app, document);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
