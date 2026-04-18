import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
//import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	/*      const corsOptions: CorsOptions = {
                origin: (
                        origin: string | undefined,
                        callback: (err: Error | null, allow?: boolean) => void,
                ) => {
                        const allowedOrigins = ['https://opencodex.app'];

                        if (!origin || allowedOrigins.includes(origin)) {
                                callback(null, true);
                        } else {
                                callback(new Error('Not allowed by CORS'));
                        }
                },
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                credentials: true,
        };*/

	app.enableCors({
		origin: ['https://opencodex.app', 'https://cv.opencodex.app'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	app.use(
		helmet({
			crossOriginResourcePolicy: { policy: 'cross-origin' },
		}),
	);
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

	await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
